// const mongoose = require("mongoose");
const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = {
    scrape: (req, res) => {
        // const fakeArr = [];
        console.log('scrape started');
        axios.get("http://www.theonion.com").then(response => {
            const $ = cheerio.load(response.data);
            $("article").each(function (i, el) {
                var sourceId = "onion" + $(el).attr('id').replace(/[^\d]/g, ""); // DB TESTED
                var theLinks = $('a', $(el));
                var linkFilterFn = (ind, aLink) => $(aLink).attr('class') && $(aLink).attr('class') === 'js_entry-link';
                var linkMapFn = (ind, aLink) => $(aLink).attr('href');
                var titleMapFn = (ind, aLink) => $(aLink).text();
                var titleNodeArr = theLinks.filter(linkFilterFn);
                var title = titleNodeArr.map(titleMapFn)[0];
                var url = titleNodeArr.map(linkMapFn)[0];
       
                // TO DO: Get category for real
                let obj = {};
                const category = "DUMMY CATEGORY NOW";
       
                var timeNode = $('time', $(el));
                var timePublished = new Date(timeNode.attr('datetime')); // DB TESTED
       
                var summaryDivNode = $('div.excerpt', $(el)).get();
                var summary = $('p', summaryDivNode).text(); // DB TESTED
                // TO DO: fix content
                const content = summary; // for now, this will be updated later to include all of the article
       
                var pictureNodes = $('picture', $(el));

                let data = {
                    sourceId: sourceId,
                    title: title,
                    url: url,
                    summary: summary,
                    timePublished: timePublished,
                }
       
                // TO DO: Get the correct image
                // DUMMY DATA is being used for now
                const src = "https://i.kinja-img.com/gawker-media/image/upload/s--BuS4lF0---/c_scale,f_auto,fl_progressive,q_80,w_800/qxxnebzl24iewavbdmtd.jpg";
                //console.log(obj);
                //console.log(fakeArr);
                let notInDatabase = 0;
                console.log(notInDatabase);
                db.FakeArticles
                    .find()
                    .then(fakeArticles => {
                        fakeArticles.map(fArticle => {
                            (fArticle.sourceId !== sourceId) ? notInDatabase++ : console.log("Found");
                        });

                        (notInDatabase === fakeArticles.length) ?
                        db.FakeArticles
                            .create(data)
                            .then(dbFArticle => console.log(dbFArticle))
                            .catch(err => res.end(err))
                        : console.log("Article already in Database");
                    })
             });
             res.json({message: "Scrape Complete"})
        });
    }
}