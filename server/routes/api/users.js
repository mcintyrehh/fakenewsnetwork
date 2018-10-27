const router = require("express").Router();
const userController = require("../../controllers/userController");

// "api/users/saved-articles/:id"
router
    .route("/saved-articles/:id")
    .get(userController.getAllSavedArticles);

// "api/users/saved-fake-articles/:id"
router
    .route("/saved-fake-articles/:id")
    .post(userController.updateUserSavedFakeArticles)
    .delete(userController.removeUserSavedFakeArticles);


// "api/users/saved-real-articles/:id"
router 
    .route("/saved-real-articles/:id")
    .post(userController.updateUserSavedRealArticles)
    .delete(userController.removeUserSavedRealArticles);

// "api/users/votedOn/:id"
router
    .route("/votedOn/:id")
    .post(userController.addToVotedOn)
    .delete(userController.removeFromVotedOn);

module.exports = router;

