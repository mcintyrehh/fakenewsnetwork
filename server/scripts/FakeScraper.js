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

      fakeArr.push("DUMMY");
      return fakeArr;

   });



   

}

function getFakeContent() {
   // TO DO
   // Algorithm is created, it just needs to be turned into code
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

