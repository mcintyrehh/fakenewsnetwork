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




                let obj = {};
                const category = "News in Brief";

                var timeNode = $('time', $(el));
                var timePublished = new Date(timeNode.attr('datetime'));

                var summaryDivNode = $('div.excerpt', $(el)).get();
                var summary = $('p', summaryDivNode).text();
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

                // For now, the image is just the onion logo
                const src = "https://i.kym-cdn.com/entries/icons/facebook/000/010/280/onion.jpg"; // onion logo image
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
            res.json({ message: "Scrape Complete" })
        });

        axios.get("http://www.clickhole.com").then(response => {
            const $ = cheerio.load(response.data);
            $("article").each(function (i, el) {
                var sourceId = "clickHole" + $(el).attr('id').replace(/[^\d]/g, ""); // DB TESTED
                var theLinks = $('a', $(el));
                var linkFilterFn = (ind, aLink) => $(aLink).attr('class') && $(aLink).attr('class') === 'js_entry-link';
                var linkMapFn = (ind, aLink) => $(aLink).attr('href');
                var titleMapFn = (ind, aLink) => $(aLink).text();
                var titleNodeArr = theLinks.filter(linkFilterFn);
                var title = titleNodeArr.map(titleMapFn)[0];
                var url = titleNodeArr.map(linkMapFn)[0];


                let obj = {};
                const category = "News in Brief";

                var timeNode = $('time', $(el));
                var timePublished = new Date(timeNode.attr('datetime'));

                var summaryDivNode = $('div.excerpt', $(el)).get();
                var summary = $('p', summaryDivNode).text();
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

                // For now, the image is just the click hole logo
                const src = ""; // click hole logo image
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
            res.json({ message: "Scrape Complete" })
        });

    }
}
