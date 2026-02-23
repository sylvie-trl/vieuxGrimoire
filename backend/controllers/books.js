const Book = require("../models/Book");
const fs = require("fs");

exports.createBook = (req, res, next) => {
  try {
    const bookObject = JSON.parse(req.body.book);
    const imageUrl = `${req.protocol}://${req.get("host")}/images/${req.optimizedImageFilename}`;
    const book = new Book({
      ...bookObject,
      imageUrl,
      userId: req.auth.userId,
      ratings: [],
      averageRating: 0,
    });

    book
      .save()
      .then(() => res.status(201).json({ message: "Livre enregistré !" }))
      .catch((error) => res.status(400).json({ error }));
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.modifyBook = (req, res, next) => {
  let bookObject = {};

  try {
    bookObject = req.file
      ? {
          ...JSON.parse(req.body.book),
          imageUrl: `${req.protocol}://${req.get("host")}/images/${req.optimizedImageFilename}`,
        }
      : { ...req.body };
  } catch (error) {
    return res.status(400).json({ error });
  }

  delete bookObject._userId;

  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId != req.auth.userId) {
        return res.status(401).json({ message: "Non autorisé" });
      } else {
        if (req.file) {
          const oldFilename = book.imageUrl.split("/images/")[1];
          fs.unlink(`images/${oldFilename}`, () => {});
        }

        Book.updateOne(
          { _id: req.params.id },
          { ...bookObject, _id: req.params.id },
        )
          .then(() => res.status(200).json({ message: "Livre modifié !" }))
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId != req.auth.userId) {
        res.status(401).json({ message: "Non autorisé" });
      } else {
        const filename = book.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Book.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: "Livre supprimé !" }))
            .catch((error) => res.status(400).json({ error }));
        });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getOneBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllBooks = (req, res, next) => {
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(500).json({ error }));
};

exports.rateBook = (req, res, next) => {
  const userId = req.auth.userId;
  const grade = Number(req.body.rating ?? req.body.grade);

  // validation note
  if (Number.isNaN(grade) || grade < 0 || grade > 5) {
    return res.status(400).json({ message: "La note doit être entre 0 et 5." });
  }

  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (!book) {
        return res.status(404).json({ message: "Livre introuvable." });
      }

      // vérifier si l'utilisateur a déjà noté
      const alreadyRated = book.ratings.some((r) => r.userId === userId);
      if (alreadyRated) {
        return res
          .status(400)
          .json({ message: "Vous avez déjà noté ce livre." });
      }

      // ajouter la note
      book.ratings.push({ userId, grade });

      // recalculer la moyenne
      const sum = book.ratings.reduce((acc, r) => acc + r.grade, 0);
      book.averageRating = sum / book.ratings.length;

      book
        .save()
        .then((updatedBook) => res.status(200).json(updatedBook))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};
