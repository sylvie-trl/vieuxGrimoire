const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const multer = require("../middleware/multer-config");
const optimizeImage = require("../middleware/optimize-image");

const bookCtrl = require("../controllers/books");

router.post("/", auth, multer, optimizeImage, bookCtrl.createBook);
router.put("/:id", auth, multer, optimizeImage, bookCtrl.modifyBook);
router.delete("/:id", auth, bookCtrl.deleteBook);
router.get("/:id", bookCtrl.getOneBook);
router.get("/", bookCtrl.getAllBooks);

module.exports = router;
