const express = require("express");

const app = express();

const mongoose = require("mongoose");
require("dotenv").config();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => console.log("Connexion à MongoDB échouée !", error));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  );
  next();
});

app.post("/api/books", (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: "Livre enregistré !",
  });
});

app.get("/api/books", (req, res, next) => {
  const book = [
    {
      userId: "qsomihvqios",
      _id: "1",
      title: "Milwaukee Mission",
      author: "Elder Cooper",
      imageURL: "/images/image-book-milwaukee-mission.jpg",
      year: 2021,
      genre: "Policier",
      ratings: [
        {
          userId: "qsomihvqios",
          grade: 3,
        },
      ],
      averageRating: 3,
    },
    {
      userId: "azezafrefze",
      _id: "2",
      title: "Book for Esther",
      author: "Alabaster",
      imageURL: "/images/image-book-esther.jpg",
      year: 2022,
      genre: "Paysage",
      ratings: [
        {
          userId: "azezafrefze",
          grade: 4,
        },
      ],
      averageRating: 4,
    },
  ];
  res.status(200).json(book);
});

module.exports = app;
