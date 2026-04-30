const mongoose = require("mongoose");

const moviesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    releaseYear: {
      type: Number,
      required: true,
    },
    genre: [
      {
        type: String,
        enum: [
          "Action",
          "Adventure",
          "Drama",
          "Comedy",
          "Romance",
          "Thriller",
          "Fantasy",
          "Sci-Fi",
          "Horro",
          "Sports",
          "Musical",
          "Other",
        ],
      },
    ],
    director: {
      type: String,
      required: true,
    },
    actors: [
      {
        type: String,
      },
    ],
    language: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      default: "India",
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    plot: String,
    awards: String,
    posterUrl: String,
    trailerUrl: String,
  },
  {
    timeStamps: true,
  }
);

const movie = mongoose.model("movie", moviesSchema);

module.exports = movie;
