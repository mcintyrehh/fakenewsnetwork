// const mongoose = require("mongoose");
require("dotenv").config();
var APIKEY = require("../key");
const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");
const gavagai = require("gavagai");

const gavClient = gavagai(APIKEY.gavangi_key);

module.exports = {

   scrape: (req, res) => {
      let now = new Date();
      let nowTime = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

      var scrapeInfo = {
         totalScrapes: 0,
         totalValidScrapes: 0,
         totalUniqueScrapes: 0,
         totalInsertedScrapes: 0,
         insertedArticles: []
      };

      let pruneObj = (obj, displayProps) => {
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

         let isArticleContent = par => par.search(/[\w]/) !== -1 && par.indexOf("Advertisement") === -1;

         axios.get(siteURL).then(response => {
               const $ = cheerio.load(response.data);
               $("article").each(function (i, el) {
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

                              scrapeInfo.totalUniqueScrapes++;

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
                                       body: content.join(" ").replace(/['"]/g, "")
                                    }];

                                    // get keywords here
                                    gavClient.keywords(gavArr, (err, data) => {
                                       if (err) {
                                          //console.log("ERROR: Gavagai keywords error: ", err);
                                       } else {
                                          //console.log("keywords returned for ", title, " are:\n", data.keywords);

                                          if (data && data.numberOfKeywords && data.numberOfKeywords > 0) {
                                             let frequencyFn = termObj => {
                                                return (termObj.occurrences > 1);
                                             };
                                             let getTermFn = termObj => termObj.term;
                                             let importantKeywords = (data.keywords).filter(frequencyFn).map(getTermFn);


                                             if (importantKeywords.length === 0) { // if no words occur more than once
                                                // console.log("\t in loop because no keywords were retained");
                                                let numOfKeywords = Math.min(5, data.keywords.length);
                                                importantKeywords = (data.keywords.slice(0, numOfKeywords)).map(getTermFn);

                                                if (importantKeywords.length === 0) { // if there are still zero keywords
                                                   return true; // then don't move forward with this term
                                                }
                                             }

                                             // create document to insert
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
                                                   scrapeInfo.totalInsertedScrapes++;
                                                   scrapeInfo.insertedArticles.push(pruneObj(dbFArticle, ["title", "sourceId", "id"]));
                                                })
                                                .catch(err => console.log("db.FakeArticles.create catch: ", err));

                                          }

                                       }
                                    });
                                 } 
                              ); 
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


      // ISSUE: Cannot get async/await to work with this code. WHY NOT?

      axios.all([processSite("http://www.theonion.com", "The Onion", "onion", "https://i.kym-cdn.com/entries/icons/facebook/000/010/280/onion.jpg"),
            processSite("http://www.clickhole.com", "Clickhole", "clickhole", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUkyAHkl2tHsmg7wN07BWT8xEN7BgWUxwWxk0NKM_ZdBeDtfBu")
         ])
         .then((resp) => res.json({
            "message": "Scraping!"
         }));

   } // end scrape method

}; // end module.exports
