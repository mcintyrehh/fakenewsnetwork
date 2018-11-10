const axios = require("axios");

// Function: getKeywordsForArticles
// Arguments: theTitle: article title, 
//            theText: article content
//            thenCB: then callback function, needs response arg
//            catchCB: catch callback function, needs err arg
// Description: given the title and content of an article, returns keywords for it by calling gavagai api
// Returns: an array of keywords, ordered from most important to least important.
// Note: We may want to experiment with setting the keywordLimit variable, as far as it affects getting relevant news articles

function getKeywordsFromText(theTitle, theText, thenCB, catchCB) {
   const keywordLimit = 10;
   const apiKey = "apiKey=77f194d9aedf5fc489b909786631c340";
   const endpoint = "https://api.gavagai.se/v3/keywords";
   const fullURL = endpoint + "?" + apiKey;
   const dataObj = {
      "detailed": false,
      "texts": [{
         "body": theTitle + "." + theText, // passing in the title as part of the body generates better keywords
         "title": theTitle,
         "id": "1"
      }],
      "significantTerms": keywordLimit,
      "splitLongSentences": true,
      "useBoundingSphere": true,
      "termMatch": "IGNORE_NON_MATCHING",
      "dampen": true,
      "boost": true,
      "language": "en",
      "useStopWords": true,
      "sortOnClusterSize": true,
      "maxUtteranceLength": 12345,
      "createChildStories": true,
      "showOptions": true
   };

   axios({
      method: 'post',
      url: fullURL,
      contentType: "application/json",
      dataType: "json",
      data: dataObj
   }).then(thenCB)
   .catch(catchCB);
}

// Sample thenCB and catchCB functions

function thenCB(response) {

    const justGetTerm = (keywordObj) => keywordObj.term;

    let keywordArr = (response.data.keywords).map(justGetTerm);

    console.log("keywrds are: ", keywordArr);
}

function catchCB(error) {
   console.log("CAUGHT CATCH ERROR WHEN GETTING KEYWORDS: ", error);
}

