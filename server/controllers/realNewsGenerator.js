const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('3f30010330714ea2a7c2f418233d5304');

// to do
// Don't include Onion results
// // BE SMART ABOUT KEYWORDS: try first 3, and then go in or out accordingly

module.exports = {
   generate: function (req, res) {

      let theKeywords = req.body.keywords;
      const articleLimit = 10; // the max number of articles this route will return
      let getFromAndToDateStrings = (daysBack) => {
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

      // for now, get news based on first two keywords, this algorithm will be tweaked
      let query = theKeywords.slice(0, 3).join(" ");
      let dates = getFromAndToDateStrings(31);
      console.log("the dates are:\n", dates, " and the query is:\n", query);
 
      newsapi.v2.everything({
         q: query,
         from: dates.from,
         to: dates.to,
         language: 'en',
         sortBy: 'relevancy',
         page: 1
      }).then(response => {
         let theReturnedArticles = response.articles.slice(0, articleLimit);
         res.status(200).json(theReturnedArticles);
      });





   }

};
