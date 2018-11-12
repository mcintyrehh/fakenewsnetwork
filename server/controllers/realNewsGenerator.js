require("dotenv").config();
const NewsAPI = require('newsapi');
const apiKey = require('../key');
const newsapi = new NewsAPI("apiKey.newsapi_key");

module.exports = {
   generate: function (req, res) {

      const theKeywords = req.body.keywords;
      const satireSources = ["Theonion.com", "Clickhole.com"]; // exclude satire results from the "real" news articles
      const articleMaxLimit = 10; // the max number of articles this ROUTE will return (in most cases, the news api response has given us more than this number)
      const articleReturnMinLimit = 20; // if a query returns less than this number of results, try to get more
      const articleReturnMaxLimit = 250; // if a query returns more than this number of results, try to get less
      const recursionLimit = 100;
      const storedResults = [];

      const filterArticleFn = articleObj => !satireSources.includes(articleObj.source.name);
      const debugMapFn = articleObj => articleObj.source.name + " : " + articleObj.title + "\n";


      const outputResults = theRecord => {
         console.log("Total Results for best query result: " + theRecord.totalResults + ", and we previously stored " + storedResults.length + " results.");

         let theArticles = theRecord.articles.slice(0, articleMaxLimit + 1).filter(filterArticleFn).slice(0, articleMaxLimit);
         console.log("Returning these ", theArticles.length, " results via public route:\n", theArticles.map(debugMapFn));
         res.status(200).json(theArticles);
      };

      const getFromAndToDateStrings = (daysBack) => {
         let toDate = new Date();
         // the math calculation in fromDate represents (daysBack * hoursInDay * minutesInHour * secondsInMinute * millisecondInSecond)
         let fromDate = new Date(toDate.getTime() - (daysBack * 24 * 60 * 60 * 1000));
         let formatNum = monthNum => ((monthNum < 9) ? "0" : "") + (monthNum + 1);
         let makeFriendlyDate = dateObj => dateObj.getFullYear() + "-" + formatNum(dateObj.getMonth()) + "-" + formatNum(dateObj.getDate());
         return {
            from: makeFriendlyDate(fromDate),
            to: makeFriendlyDate(toDate)
         };
      };

      const dates = getFromAndToDateStrings(30);

      const storedResultsSortFn = (a, b) => {
         let getGoodnessValue = obj => {
            let nResults = obj.totalResults;
            if (nResults < articleReturnMinLimit) {
               return ((articleReturnMinLimit - nResults) * 10000000);
            } else { // nResults is over the articleReturnMaxLimit
               return (nResults - articleReturnMaxLimit);
            }
         };
         return getGoodnessValue(a) - getGoodnessValue(b);
      };

      const getRecordFromStoredResults = () => {
         console.log("in getRecordsFromStoredResults");
         let nStored = storedResults.length;
         if (nStored === 0) {
            return [];
         } else {
            return storedResults.sort(storedResultsSortFn)[0];
         }
      };

      const doNewsAPICall = (thenCB, catchCB, query) => {
         console.log("\nin doNewsAPICall");
         newsapi.v2.everything({
               q: query,
               from: dates.from,
               to: dates.to,
               language: 'en',
               sortBy: 'relevancy',
               page: 1
            }).then(thenCB)
            .catch(catchCB);
      };


      // FUNCTION: getRealNewsArticles
      // Description: this function is the crux of an involved algorithm used to generate the most relevant news articles
      // We want responses that are as focused as possible, but we do not want it so focused that we don't get any results,
      // or get only obscure results back

      const getRealNewsArticles = (keywordArr, nKeywords, state, counter) => {
         console.log("\n*** in getRealNewsArticles, keywordArr is: ", keywordArr.join(" "),"\n",
                     "\nactive keywords are: ", keywordArr.slice(0,nKeywords).join(" "),"\n",
         "\nnKeywords: ", nKeywords, "state: ", state, "counter: ", counter);

         counter++; // increment this every loop, it's an extra safeguard against endless recursion

         if (counter > recursionLimit) {
            console.log("WARNING: Recursion limit reached in RNG getRealNewsArticles, figure out why this is happening");
            outputResults(getRecordFromStoredResults());
         }


         const catchCBFn = err => { // "catch" callback function for getting real news articles
            console.log(err);
            throw err;
         };

         const thenCBFn = response => { // "then" callback function for getting real news articles
            let nResults = (response.totalResults) ? response.totalResults : 0;

            if (nResults <= articleReturnMaxLimit && nResults >= articleReturnMinLimit) { // if an ideal number of results is returned
               console.log("YAY, found an ideal query using keywords: ", keywordArr.slice(0, nKeywords));
               outputResults(response); // YAY, got what we wanted, output it!

            } else { // otherwise, this particular query has returned too few or too many results vs the ideal amount
               if (state === 0) { // we start by just querying the first item of an array, state 0 means we are only querying the first item
                  if (nResults < articleReturnMinLimit) { // if less than the ideal number of results are returned
                     console.log("\n\t### case 0 lessThanIdeal: ", nResults, "\n");
                     if (nResults > 0) { // then store this result, as long as at least *some* results are returned
                        storedResults.push(response);
                     }
                     if (keywordArr.length > 1) { // if there is more than one keyword in array, then slice off the first one and query the second keyword next time
                        console.log("front item of array should be removed on next call");
                        keywordArr = keywordArr.slice(1);
                        getRealNewsArticles(keywordArr, nKeywords, state, counter);
                     } else { // there is currently only one keyword left in this array, so just choose best from stored results
                        outputResults(getRecordFromStoredResults());
                     }
                  } else { // this response has returned more than the target articleReturnMaxLimit
                     // there are more results returned then is ideal, let's try to refine them more
                     // during the next loop through, we will query based on the first two results, instead of just the first one
                     // In doing so, we are now in state 1 instead of state 0
                     console.log("\n\t### case 0 moreThanIdeal: ", nResults, "\n");
                     getRealNewsArticles(keywordArr, 2, 1, counter);
                  }
               } else if (state === 1) { // state = 1, this means: if we are querying using more than one keyword in the array
                  if (nResults < articleReturnMinLimit) { // if this response has returned less than the ideal number of articles
                     console.log("\n\t### case 1 lessThanIdeal: ", nResults, "\n");
                     if (nResults > 0) { // store this result as long as it returned more than 0 results
                        storedResults.push(response);
                     }

                     if (nKeywords < keywordArr.length) { // if there are keywords we haven't tried yet
                        // Try again, but this time don't use the last active keyword we used, since it limited the response too much
                        keywordArr.splice(nKeywords - 1, 1);
                        getRealNewsArticles(keywordArr, nKeywords, state, counter);
                     } else { // otherwise choose the best response from our available saved responses
                        outputResults(getRecordFromStoredResults());

                     }


                  } else { // we are querying using more than one item, but still getting more results than ideal
                     console.log("\t### case 1 moreThanIdeal: ", nResults, "\n");
                     storedResults.push(response); // but store this result anyway, as it might be the best possible result

                     // 2. Check keyword array length to see if it's possible to use more keywords; if it is, then loop using one more
                     if (nKeywords < keywordArr.length) {
                        nKeywords++;
                        getRealNewsArticles(keywordArr, nKeywords, state, counter);
                     } else { // we are already using all of the keywords in the array
                        // we are at a dead end, choose from amongst our stored results
                        outputResults(getRecordFromStoredResults());
                     }
                  }

               } else {
                  console.log("RNG ERROR: This branch should never be reached, it means getRealNewsArticles state has been set to something besides 0 or 1");
               }
            }
         };

         // Call newsapi, and get some results...
         doNewsAPICall(thenCBFn, catchCBFn, keywordArr.slice(0, nKeywords).join(" "));


      };

      getRealNewsArticles(theKeywords, 1, 0, 0); // Let's roll! Let's start this thing!

   }

};
