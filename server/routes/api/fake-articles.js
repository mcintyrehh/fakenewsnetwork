const router = require("express").Router();
const fakeNewsController = require("../../controllers/fakeArticlesController");

/*
    Hava, add scrape route here!
    Add scrape Controller and import it here as well
*/

// "/api/fake-articles"
router
    .route("/")
    .get(fakeNewsController.findAll)
    .post(fakeNewsController.create);

// "/api/fake-articles/:id"
router
    .route("/:id")
    .get(fakeNewsController.findById)
    //update with keywords
    .put(fakeNewsController.updateWithKeywords)
    .delete(fakeNewsController.remove);

// "/api/fake-articles/add-content/:id"
router
    .route("/add-content/:id")
    .put(fakeNewsController.updateWithContent);

// "/api/fake-articles/update-score/:id"
router
    .route("/update-score/:id")
    .put(fakeNewsController.updateScoreOfAssociatedRealArticle);

// "/api/fake-articles/real-articles/:id"
router
    .route("/real-articles/:id")
    .put(fakeNewsController.updateWithRealNews);


module.exports = router;
