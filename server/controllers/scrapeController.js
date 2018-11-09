// const mongoose = require("mongoose");
const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = {

   scrape: (req, res) => {

      let scrapeInfo = {
         totalScrapes: 0,
         totalValidScrapes: 0,
         totalUniqueScrapes: 0,
         totalInsertedScrapes: 0,
         scrapedArticles: []
      };
    

      let processSite = (siteURL, siteName, shortName, imageSrc) => {
         console.log("\n\n***** IN processSite, WITH...", siteName);
         let now = new Date();
         let nowTime = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
         console.log("Scraping " + siteName + " at time " + nowTime);

         let isArticleContent = par => par.search(/[\w]/) !== -1 && par.indexOf("Advertisement") === -1;

         axios.get(siteURL).then(response => {
               const $ = cheerio.load(response.data);
               $("article").each(function (i, el) {
                     console.log("\n*** BBBeginning of EACH loop");
                     let summaryDivNode = $('div.excerpt', $(el)).get();
                     let summary = $('p', summaryDivNode).text();
                     if (!summary) {
                        return true; // go to the next iteration if there is no summary
                     }

                     let thisSourceId = shortName + $(el).attr('id').replace(/[^\d]/g, "");
                     let theLinks = $('a', $(el));
                     let linkFilterFn = (ind, aLink) => $(aLink).attr('class') && $(aLink).attr('class') === 'js_entry-link';
                     let linkMapFn = (ind, aLink) => $(aLink).attr('href');
                     let titleMapFn = (ind, aLink) => $(aLink).text();
                     let titleNodeArr = theLinks.filter(linkFilterFn);
                     let title = titleNodeArr.map(titleMapFn)[0];
                     let detailURL = titleNodeArr.map(linkMapFn)[0];
                     let category = "News in Brief";
                     let timeNode = $('time', $(el));
                     let timePublished = new Date(timeNode.attr('datetime'));
                     let content = [];

                     let findOneCallbackFn = (err, docs) => {
                        if (err) {
                           console.log("\n!!!!!!!! ERROR in db.FakeArticles.find cb function, and it is: ");
                           console.log(err,"\n");
                        } else if (docs) {

                          if (docs.length && docs.length > 0) {
                             console.log("\tduplicate FOUND for article '", title, " with sourceId of ", thisSourceId, ".");
                             console.log("here is dup that was found: ", docs);
                             return true; // go to the next iteration of the each loop, because this article is already in the database

                          } else {
                             console.log("\t", title, " IS NOT a duplicate record so it should be inserted into database");
                             console.log("docs is: ", docs);

                             axios.get(detailURL).then(detailPage => {
                              console.log("STATUS: in axios.get for detail page ", detailURL);
                              const $$ = cheerio.load(detailPage.data); // note the use of $$ instead of just $ here
                              let articleNode = $$('article')[0];
                              let paragraphNodes = $$('p', articleNode);
   
                              paragraphNodes.each(function (j, ele) {
                                 let theText = $$(ele).text();
                                 if (isArticleContent(theText)) {
                                    content.push(theText);
                                 }
                              });
   
                              let data = {
                                 sourceId: thisSourceId,
                                 title: title,
                                 url: detailURL,
                                 summary: summary,
                                 timePublished: timePublished,
                                 content: content,
                                 category: category,
                                 src: imageSrc,
                                 articleSource: siteName
                              };
   
                              // Note: the database will only accept records with unique sourceId's, while this code
                              // is written to only process articles not yet in the database, there is additional protection
                              // from the FakeArticles model, which forces sourceId to be unique
   
                              db.FakeArticles
                                 .create(data)
                                 .then(dbFArticle => console.log("inserted: ", dbFArticle.title))
                                 .catch(err => console.log("db.FakeArticles.create catch: ", err));
   
                           } // end axios.get
                        ); // end then block
                          } // end else block that covers the case where this record is a new record.
                        } else { // we have looked for a record, and neither ERR or DOCS has returned as expected
                           console.log("WEIRD RESULT, no err or docs returned in cb function, expecting 0 or 1 records returned.");
                           console.log("\tWEIRD RESULT docs: ", docs);
                           console.log("\tWEIRD RESULT err:", err);
                        }
                     };

                     // added stuff here
                     db.FakeArticles
                     .find({ sourceId: thisSourceId}, 'sourceId', findOneCallbackFn)
                     .catch(err => console.log("CATCH block in findOne: ", err));


                     // end adding stuff
      
                  } // end body of each loop function
               );  // closing paren of each method
            } // closing bracket of response function body
         );  // closing paren of then method of axios.get
      };  // closing bracket of processSite arrow function


      axios.all([processSite("http://www.theonion.com", "The Onion", "onion", "https://i.kym-cdn.com/entries/icons/facebook/000/010/280/onion.jpg"),
            processSite("http://www.clickhole.com", "Clickhole", "clickhole", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUkyAHkl2tHsmg7wN07BWT8xEN7BgWUxwWxk0NKM_ZdBeDtfBu")
         ])

         .then(axios.spread(function (onionSite, clickholeSite) {
            // console.log(onionSite);
            // console.log(clickholeSite);
            res.json({message: "Scrape complete"});
         })); // all part of then clause

   } // closing bracket of scrape method
}; // closing bracket of module.exports
