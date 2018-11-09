// const mongoose = require("mongoose");
const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = {
    scrape: (req, res) => {
        // const fakeArr = [];
        let now = new Date();
        let nowTime = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
        console.log("\n\n*******SCRAPE STARTED AT ", nowTime, "\n\n");
        axios.get("http://www.theonion.com").then(response => {
            const $ = cheerio.load(response.data);
            $("article").each(function (i, el) {
                let summaryDivNode = $('div.excerpt', $(el)).get();
                let summary = $('p', summaryDivNode).text();
                   if (!summary) {
                      return true;
                   }

                let sourceId = "onion" + $(el).attr('id').replace(/[^\d]/g, ""); // DB TESTED
                let theLinks = $('a', $(el));
                let linkFilterFn = (ind, aLink) => $(aLink).attr('class') && $(aLink).attr('class') === 'js_entry-link';
                let linkMapFn = (ind, aLink) => $(aLink).attr('href');
                let titleMapFn = (ind, aLink) => $(aLink).text();
                let titleNodeArr = theLinks.filter(linkFilterFn);
                let title = titleNodeArr.map(titleMapFn)[0];
                let url = titleNodeArr.map(linkMapFn)[0];
                let category = "News in Brief";
                let timeNode = $('time', $(el));
                let timePublished = new Date(timeNode.attr('datetime'));
                
                let content = [summary]; // for now, this will be updated later to include all of the article
                // For now, the src is just the Onion logo
                let src = "https://i.kym-cdn.com/entries/icons/facebook/000/010/280/onion.jpg"; // onion logo image

                let data = {
                    sourceId: sourceId,
                    title: title,
                    url: url,
                    summary: summary,
                    timePublished: timePublished,
                    content: content,
                    category: category,
                    src: src,
                    articleSource: "The Onion"
                };

                
      
                let notInDatabase = 0;
                //console.log(notInDatabase);
                db.FakeArticles
                    .find()
                    .then(fakeArticles => {
                        fakeArticles.forEach(fArticle => {
                            if (fArticle.sourceId !== sourceId){
                              notInDatabase++;
                            } else {
                              console.log("Found");
                            } 
                        });
                        
                        if (notInDatabase === fakeArticles.length) {
                           //console.log("the length is: ", fakeArticles.length);

                           db.FakeArticles
                           .create(data)
                           .then(dbFArticle => {})
                           .catch(err => console.log(err));
                        } else {
                           console.log("Article already in Database");
                        }
                        
                            
                         
                    });
            });
            res.json({ message: "Onion scrape complete" });
        });

        axios.get("http://www.clickhole.com").then(response => {
            const $ = cheerio.load(response.data);
            $("article").each(function (i, el) {
                let summaryDivNode = $('div.excerpt', $(el)).get();
                let summary = $('p', summaryDivNode).text();
                   if (!summary) {
                      return true;
                   }
                
                let sourceId = "clickhole" + $(el).attr('id').replace(/[^\d]/g, ""); // DB TESTED
                let theLinks = $('a', $(el));
                let linkFilterFn = (ind, aLink) => $(aLink).attr('class') && $(aLink).attr('class') === 'js_entry-link';
                let linkMapFn = (ind, aLink) => $(aLink).attr('href');
                let titleMapFn = (ind, aLink) => $(aLink).text();
                let titleNodeArr = theLinks.filter(linkFilterFn);
                let title = titleNodeArr.map(titleMapFn)[0];
                let url = titleNodeArr.map(linkMapFn)[0];
                let category = "News in Brief";
                let timeNode = $('time', $(el));
                let timePublished = new Date(timeNode.attr('datetime'));
                let content = [summary]; // for now, this will be updated later to include all of the article
         

                 // For now, the src is just the clickhole logo
                 const src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUkyAHkl2tHsmg7wN07BWT8xEN7BgWUxwWxk0NKM_ZdBeDtfBu"; // clickhole image

                let data = {
                    sourceId: sourceId,
                    title: title,
                    url: url,
                    summary: summary,
                    timePublished: timePublished,
                    content: content,
                    category: category,
                    src: src,
                    articleSource: "Clickhole"
                };

           
                let notInDatabase = 0;
                // console.log(notInDatabase);
                db.FakeArticles
                    .find()
                    .then(fakeArticles => {
                        fakeArticles.map(fArticle => {
                            (fArticle.sourceId !== sourceId) ? notInDatabase++ : console.log("Found");
                        });

                        (notInDatabase === fakeArticles.length) ?
                            db.FakeArticles
                                .create(data)
                                .then(dbFArticle => {})
                                .catch(err => console.log(err))
                            : console.log("Article already in Database");
                    });
            });
            //res.json({ message: "Clickhole scrape complete" });
        });

    }
};
