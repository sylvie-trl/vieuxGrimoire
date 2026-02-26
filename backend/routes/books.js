const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const multer = require("../middleware/multer-config");
const optimizeImage = require("../middleware/optimize-image");

const bookCtrl = require("../controllers/books");

router.post("/", auth, multer, optimizeImage, bookCtrl.createBook);
router.get("/", bookCtrl.getAllBooks);
router.get("/bestrating", bookCtrl.getBestRatedBooks);
router.get("/:id", bookCtrl.getOneBook);
router.put("/:id", auth, multer, optimizeImage, bookCtrl.modifyBook);
router.delete("/:id", auth, bookCtrl.deleteBook);
router.post("/:id/rating", auth, bookCtrl.rateBook);

module.exports = router;
