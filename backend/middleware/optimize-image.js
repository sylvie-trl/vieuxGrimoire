const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

module.exports = (req, res, next) => {
  console.log("FILE:", req.file); //pour debug

  if (!req.file) return next();

  const filename = `book_${Date.now()}.webp`;
  const imagesDir = path.join(__dirname, "..", "images");
  const filepath = path.join(imagesDir, filename);

  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
  }

  sharp(req.file.buffer)
    .resize(800)
    .webp({ quality: 80 })
    .toFile(filepath)
    .then(() => {
      req.optimizedImageFilename = filename;
      next();
    })
    .catch((error) => next(error));
};
