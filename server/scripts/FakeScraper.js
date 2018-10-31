var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");


function scrapeFake() {
   var axios = require("axios");
   var cheerio = require("cheerio");
   var fakeArr = [];

   axios.get("http://www.theonion.com").then(function (response) {
      console.log("in axios part");
      var $ = cheerio.load(response.data);
      var obj = {};

      $("article").each(function (i, el) {
         obj.sourceID = "onion" + $(el).attr('id').replace(/[^\d]/g, ""); // DB TESTED
         var theLinks = $('a', $(el));
         var linkFilterFn = (ind, aLink) => $(aLink).attr('class') && $(aLink).attr('class') === 'js_entry-link';
         var linkMapFn = (ind, aLink) => $(aLink).attr('href');
         var titleMapFn = (ind, aLink) => $(aLink).text();
         var titleNodeArr = theLinks.filter(linkFilterFn);
         obj.title = titleNodeArr.map(titleMapFn)[0];
         obj.url = titleNodeArr.map(linkMapFn)[0];

         // TO DO: Get category for real
         obj.category = "DUMMY CATEGORY NOW";

         var timeNode = $('time', $(el));
         obj.timePublished = new Date(timeNode.attr('datetime')); // DB TESTED

         var summaryDivNode = $('div.excerpt', $(el)).get();
         obj.summary = $('p', summaryDivNode).text(); // DB TESTED
         // TO DO: fix content
         obj.content = [obj.summary]; // for now, this will be updated later to include all of the article

         var pictureNodes = $('picture', $(el));

         // TO DO: Get the correct image
         // DUMMY DATA is being used for now
         obj.src = "https://i.kinja-img.com/gawker-media/image/upload/s--BuS4lF0---/c_scale,f_auto,fl_progressive,q_80,w_800/qxxnebzl24iewavbdmtd.jpg";

         fakeArr.push(obj);
         //console.log(obj);
         //console.log(fakeArr);
      });

      return fakeArr;

   });

// Current code:

var corpus = "Here is some Yoda talk: Venus and Sabrina Williams play a lot of tennis, sometimes at Wimbledon do they play tennis, Venus and Serena tennis play";
var textObj = {
   "id": 1,
   "title": "Test Title",
   "body": corpus
};
var postObj = {
   "language": "en",
   "significantTerms": 1,
   "texts": [textObj]
};
var apiKey = "apiKey=" + "0af74c60beb320f29653f316238cda9a";
var endpoint = "https://api.gavagai.se/v3/keyword";
var fullURL = endpoint + "?" + apiKey;
var configObj = {
   "url": fullURL,
   "data": postObj
};
var cb = (err,res2) => {
   if (err) {
      console(err);
   } else {
      console.log("ERR: ", err);
      console.log("DATA: ", res2.data);
      console.log("STATUS: ", res2.status);
      console.log("STATUS TEXT: ", res2.statusText);
      console.log("HEADERS: ", res2.headers);
      console.log("CONFIG: ", res2.config);
   }
};


request.post(configObj, cb);

// And here is the reply:
/*
ERR:  null
DATA:  undefined
STATUS:  undefined
STATUS TEXT:  undefined
HEADERS:  { server: 'openresty/1.7.4.1',
date: 'Sun, 28 Oct 2018 16:25:27 GMT',
'content-type': 'application/json; charset=utf-8',
'transfer-encoding': 'chunked',
connection: 'close' }
CONFIG:  undefined
GET /key - - ms - -
ERR:  null
DATA:  undefined
STATUS:  undefined
STATUS TEXT:  undefined
HEADERS:  { server: 'openresty/1.7.4.1',
date: 'Sun, 28 Oct 2018 16:25:54 GMT',
'content-type': 'application/json; charset=utf-8',
'transfer-encoding': 'chunked',
connection: 'close' }
CONFIG:  undefined
GET /key - - ms - -
ERR:  null
DATA:  undefined
STATUS:  undefined
STATUS TEXT:  undefined
HEADERS:  { server: 'openresty/1.7.4.1',
date: 'Sun, 28 Oct 2018 16:27:54 GMT',
'content-type': 'application/json; charset=utf-8',
'transfer-encoding': 'chunked',
connection: 'close' }
CONFIG:  undefined
GET /key - - ms - -
*/

   

}

// fakeURLs to use for testing purposes:
var testURLs = ["https://politics.theonion.com/trump-boys-smash-father-s-cell-phone-to-search-for-chin-1830032021",
   "https://www.clickhole.com/disaster-a-no-nonsense-grandma-has-started-hanging-her-1829721726",
   "https://politics.theonion.com/midterms-predicted-to-have-largest-voter-in-decades-1829999895",
   "https://www.theonion.com/study-finds-effectiveness-of-medical-treatment-skyrocke-1829999052"
];

function getFakeContent(theURL) {
   
     // Note: the scrapeDetailFn is wrapped in the getFakeContent function because my ultimate vision
     // was to have getFakeContent handle multiple URLs at once. It doesn't do that yet. But I'm leaving
     // the structure as is, because I know that this code works.
     let scrapeFakeDetailFn = (theURL) => {
      let thenFn = (response) => {
         let $ = cheerio.load(response.data);
         let articleNode = $('article')[0];
         let targetParagraphs = $("p", articleNode);
         let theContent = $(targetParagraphs[0]).text(); 
         let contentArr = [theContent]; // this variable contains what we need, for now at least
         console.log(" and the content is: ", contentArr);

         // the content array is returned here, it may work work to process it inline though
         // if relying on the return statement here, the calling code needs to be written
         // to handle asynchronous operations, such as axios.all, promise.all, and/or async/await
         return contentArr;
          
      // keep the following debug map function in the code for debugging purposes
      // it is not currently used, but may be used again for troubleshooting
         let debugMapFn = (i, par) => {
            console.log("\n ****   ****  **********    ********** *************");
            if (i===0) { // change this condition according to needs
               console.log("ON PAR NUMBER ", i, " and this is what I see: ");
               console.log($(par));
               console.log("\n and there is just the text: * * * * *")
               console.log($(par).text());
            }
         };

   
      };

      let catchFn = (err) => {
         setTimeout(function () {
            throw err;
         }, 1);
      };

      axios.get(theURL)
         .then(thenFn)
         .catch(catchFn);
   };
   
   scrapeFakeDetailFn(theURL);
   
}

function getFakeKeywords() {
   // TO DO
   // The Keywords API has been tested and found to work with what we need it to do
}

var FS = {};
FS.scrapeFake = scrapeFake;
FS.getFakeContent = getFakeContent;
FS.getFakeKeywords = getFakeKeywords;

module.exports = FS;

