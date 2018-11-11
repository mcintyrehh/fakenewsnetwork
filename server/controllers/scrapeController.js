// const mongoose = require("mongoose");
const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");
const gavagai = require("gavagai");
const gavClient = gavagai("77f194d9aedf5fc489b909786631c340");

module.exports = {

   scrape: (req, res) => {
      const now = new Date();
      const nowTime = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
      const nReturnedKeywords = 20; 

      // This scrapeInfo object will only be used for debugging
      // Though it is not being used now, it may be used later
      var scrapeInfo = {
         totalScrapes: 0,
         totalValidScrapes: 0,
         totalUniqueScrapes: 0,
         totalInsertedScrapes: 0,
         insertedArticles: []
      };

      // This pruneObj function is just for debugging purposes
      // It prunes objects so that they when they are console logged, we can focus on only the most important information
      // Sample usage: console.log(  pruneObj(myObj,["name","id"])    )
      const pruneObj = (obj, displayProps) => {
         let displayObj = {};
         for (let prop in obj) {
            if (displayProps.includes(prop)) {
               displayObj[prop] = obj[prop];
            }
         }
         return displayObj;
      };

      let processSite = (siteURL, siteName, shortName, imageSrc) => {

         console.log("Scraping " + siteName + " at time " + nowTime);

         // this isArticleContent function is used by an Array.filter method to check if paragraphs
         // that are scraped from a page are ones we want to keep.
         // We keep the paragraph text if it includes word characters, and if it is not an advertisement
         let isArticleContent = par => par.search(/[\w]/) !== -1 && par.indexOf("Advertisement") === -1;

         axios.get(siteURL).then(response => {
               const $ = cheerio.load(response.data);
               $("article").each(function (i, el) {

                     // this is just for debugging purposes
                     scrapeInfo.totalScrapes++; // we are trying to scrape a new article, to add to total scrapes

                     let summaryDivNode = $('div.excerpt', $(el)).get();
                     let summary = $('p', summaryDivNode).text();
                     if (!summary) {
                        return true; // go to the next iteration if there is no summary
                     } else {
                        scrapeInfo.totalValidScrapes++;
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
                           console.log(err, "\n");
                        } else if (docs) {

                           if (docs.length && docs.length > 0) {
                              // console.log("\tduplicate FOUND for article '", title, " with sourceId of ", thisSourceId, ".");
                              //  console.log("here is dup that was found: ", docs);
                              return true; // go to the next iteration of the each loop, because this article is already in the database

                           } else {
                              // console.log("\t", title, " IS NOT a duplicate record so it should be inserted into database");
                              // console.log("docs is: ", docs);

                              scrapeInfo.totalUniqueScrapes++; // just for debugging purposes

                              axios.get(detailURL).then(detailPage => {
                                 //console.log("\tin axios.get for detail page ", detailURL);
                                 const $$ = cheerio.load(detailPage.data); // note the use of $$ instead of just $ here
                                 let articleNode = $$('article')[0];
                                 let paragraphNodes = $$('p', articleNode);

                                 paragraphNodes.each(function (j, ele) {
                                    let theText = $$(ele).text();
                                    if (isArticleContent(theText)) {
                                       content.push(theText);
                                    }
                                 });

                                 let gavArr = [{
                                    id: "1",
                                    title: title,
                                    body: title + "." + content.join(" ").replace(/['"]/g, "") // adding title to body yields better keywords
                                 }];

                                 // get keywords here
                                 gavClient.keywords(gavArr, (err, data) => {
                                    if (err) {
                                       console.log("ERROR: Gavagai keywords error: ", err);
                                    } else {
                                       //console.log("keywords returned for ", title, " are:\n", data.keywords);

                                       if (data && data.numberOfKeywords && data.numberOfKeywords > 0) {
                                          let getTermFn = termObj => termObj.term;
                                          let importantKeywords = (data.keywords).slice(0, nReturnedKeywords).map(getTermFn);

                                          // if this article doesn't generate any keywords for some strange reason, then just skip it
                                          // and don't insert it into our database
                                          if (importantKeywords.length === 0) {
                                             return true; // returning true from a cheerio each loop is like a for loop "continue"
                                          }

                                          // create document to insert into fake articles collection
                                          let docData = {
                                             sourceId: thisSourceId,
                                             title: title,
                                             url: detailURL,
                                             summary: summary,
                                             timePublished: timePublished,
                                             content: content,
                                             category: category,
                                             src: imageSrc,
                                             articleSource: siteName,
                                             keywords: importantKeywords
                                          };

                                          db.FakeArticles
                                             .create(docData)
                                             .then(dbFArticle => {
                                                // scrapeInfo is for debugging purposes
                                                scrapeInfo.totalInsertedScrapes++;
                                                scrapeInfo.insertedArticles.push(pruneObj(dbFArticle, ["title", "sourceId", "id"]));
                                                console.log("\t Just inserted into database: ", pruneObj(dbFArticle, ["title", "sourceId", "id"]));
                                             })
                                             .catch(err => console.log("ERROR in CATCH block of db.FakeArticles.create: ", err));

                                       } else {
                                          console.log("ERROR: This branch should not be reached, something is wrong.\nIt may be a GAVAGAI keyword parse error of some sort.");
                                       }

                                    }
                                 });
                              });
                           }
                        } else { // we have looked for a record, and neither ERR or DOCS has returned as expected
                           console.log("WEIRD RESULT, no err or docs returned in findOne cb function");
                        }
                     };

                     db.FakeArticles
                        .find({
                           sourceId: thisSourceId
                        }, 'sourceId', findOneCallbackFn)
                        .catch(err => console.log("CATCH block in findOne: ", err));


                     // end adding stuff

                  } // end body of each loop function
               ); // closing paren of each method
            } // closing bracket of response function body
         ); // closing paren of then method of axios.get
      }; // closing bracket of processSite arrow function



      axios.all([processSite("http://www.theonion.com", "The Onion", "onion", "https://i.kym-cdn.com/entries/icons/facebook/000/010/280/onion.jpg"),
            processSite("http://www.clickhole.com", "Clickhole", "clickhole", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUkyAHkl2tHsmg7wN07BWT8xEN7BgWUxwWxk0NKM_ZdBeDtfBu")
         ])
         .then((resp) => res.json({
            "message": "Scraping!"
         })).catch(err => console.log("ERROR in CATCH block of axios.all: ".err));



   } // end scrape method

}; // end module.exports
