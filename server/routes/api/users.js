const router = require("express").Router();
const userController = require("../../controllers/userController");

// "api/users/saved-articles/:id"
router
    .route("/saved-articles/:id")
    .get(userController.getAllSavedArticles);

// "api/users/saved-fake-articles/:id"
router
    .route("/saved-fake-articles/:id")
    .put(userController.updateUserSavedFakeArticles);

// "api/users/saved-real-articles/:id"
router 
    .route("/saved-real-articles/:id")
    .put(userController.updateUserSavedRealArticles);