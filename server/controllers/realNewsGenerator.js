require("dotenv").config();
const NewsAPI = require('newsapi');
const apiKey = require('../key');
const newsapi = new NewsAPI("apiKey.newsapi_key");

// Stuff to do:
// Fix dates - we should decide on a date range
// Be smart about keywords: try it with first three

module.exports = {
   generate: function (req, res) {
      let theKeywords = req.body.keywords;
      console.log("req body is: ", req.body);

      let getRealNews = (keywordArr) => {
         // for now, get news based on first two keywords, this algorithm will be tweaked
         // for now, date range is hard-coded, this will shortly be fixed.
         let query = keywordArr.slice(0, 3).join(" ");
         console.log("query is: ", query);

         newsapi.v2.everything({
            q: query,
            from: '2018-11-01',
            to: '2018-11-10',
            language: 'en',
            sortBy: 'relevancy',
            page: 1
         }).then(response => {
            let theReturnedArticles = response.articles.slice(0,7);

            res.status(200).json(theReturnedArticles);
         });

      };

      getRealNews(theKeywords);

   }


};
