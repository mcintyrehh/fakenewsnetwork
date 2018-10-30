// this is code that will be used in the code later, temporarily checking them in here to avoid merge conflicts
// have to work out some concurrency issues with asynchonous operations

// Function: getKeywordsForArticles
// Arguments: theTitle: article title, 
//            theText: article content
// Description: given the title and content of an article, returns keywords for it by calling gavagai api
// Returns: an array of keywords, ordered from most important to least important.
// Note: We may want to experiment with setting the keywordLimit variable, as far as it affects getting relevant news articles
function getKeywordsFromText(theTitle, theText) {
   const keywordLimit = 5;
   const apiKey = "apiKey=77f194d9aedf5fc489b909786631c340";
   const endpoint = "https://api.gavagai.se/v3/keywords";
   const fullURL = endpoint + "?" + apiKey;
   const dataObj = {
      "detailed": false,
      "texts": [{
         "body": theText,
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
   }).then(function (response) {

      // console.log("DEBUG IN GC, THE KEYWORDS RESPONSE IS: ", response.data);

      const justGetTerm = (keywordObj) => keywordObj.term;

      let justTerms = (response.data.keywords).map(justGetTerm);

      console.log("DEBUG IN GC, terms are: ", justTerms);




   }).catch(function (error) {

      console.log("DEBUG IN GK, CAUGHT ERROR WHEN GETTING KEYWORDS: ");
      console.log(error);
      return null;
   });
}

function multipleCallsExampleCode() {
   var articleArr = [
      {title:"hi",content:"Mickey and Minnie were sitting in the pool, ha ha ha, yes yes yes Disneyland muppets Mickey and Minney boat cat automobile"},
      {title:"bye",content:"Venus Williams Serena Williams, ha ha ha, yes yes yes Disneyland muppets Mickey and Minney boat cat automobile"},
      {title:"hello",content:"Donald Duck quack Duck, ha ha ha, yes yes yes Disneyland muppets Mickey and Minney boat cat automobile"},
      {title:"now",content:"Mickey and Minnie were sitting in the pool, ha ha ha, yes yes yes Disneyland muppets Mickey and Minney boat cat automobile"},
      {title:"later",content:"Mickey and Minnie were sitting in the pool, ha ha ha, yes yes yes Disneyland muppets Mickey and Minney boat cat automobile"},
   ];

   var getKeywords = (articleObj) => {
      getKeywordsFromText(articleObj.title, articleObj.content);
   };

   axios.all(articleArr.map(getKeywords))
      .then(axios.spread(function (theResponses) {
         // BUG: theResponses is always null, not clear why
         // the getKeywordsFromText fn is actually being called, just not returning anything
         var hackFn = () => console.log("RESPONSES ARE: ", theResponses);

         setTimeout(hackFn, 6000);
      
      })).catch(function (error) {
         console.log("CAUGHT ERROR IN 'GET KEYWORDS FOR ARTICLES': ", (new Date().getTime()));
         console.log(error);
      });


}
