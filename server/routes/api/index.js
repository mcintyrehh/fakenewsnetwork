const router = require("express").Router();
const bookRoutes = require("./books");
const fakeArticleRoutes = require("./fake-articles");
const realArticleRoutes = require("./real-articles");


router.use("/fake-articles", fakeArticleRoutes);
router.use("/real-articles", realArticleRoutes);

module.exports = router;
