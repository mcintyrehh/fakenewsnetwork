const router = require("express").Router();
const bookRoutes = require("./books");
const fakeArticleRoutes = require("./fake-articles");

// Book routes
router.use("/books", bookRoutes);
router.use("/fake-articles", fakeArticleRoutes);

module.exports = router;
