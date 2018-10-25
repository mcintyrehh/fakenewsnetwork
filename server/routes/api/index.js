const router = require("express").Router();
const fakeArticleRoutes = require("./fake-articles");
const realArticleRoutes = require("./real-articles");
const userRoutes = require("./users");


router.use("/fake-articles", fakeArticleRoutes);
router.use("/real-articles", realArticleRoutes);
router.use("/users", userRoutes);

module.exports = router;
