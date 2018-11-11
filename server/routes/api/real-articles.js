const router = require("express").Router();
const realNewsController = require("../../controllers/realArticlesController");
const realNewsGenerator = require("../../controllers/realNewsGenerator");

// "/api/real-articles"

router
   .route("/")
   .get(realNewsController.findAll)
   .post(realNewsController.create);

// "/api/real-articles/:id"

router
   .route("/:id")
   .get(realNewsController.findById)
   .put(realNewsController.update)
   .delete(realNewsController.remove);

// "/api/real-articles/generate
router
   .route("/generate")
   .post(realNewsGenerator.generate);

module.exports = router;
