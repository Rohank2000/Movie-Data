const express = require("express");

const app = express();

const { connectedDatabase } = require("./db/db.connect");

connectedDatabase();

app.use(express.json());

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

const Movie = require("./models/movies.models");

// // //Filtering MovieData in the Database using Movie Title

const filterByTitle = async (searchByTitle) => {
  try {
    const searchByMovieTitle = await Movie.findOne({ title: searchByTitle });
    console.log(searchByMovieTitle);
    return searchByMovieTitle;
  } catch (error) {
    console.log(error);
  }
};

app.get("/movies/:movieTitle", async (req, res) => {
  try {
    const movieDataByTitle = await filterByTitle(req.params.movieTitle);
    if (movieDataByTitle) {
      res.status(200).json({
        message: "MovieData Fetched using MovieTitle",
        movieDataByTitle,
      });
    } else {
      res.status(404).json({ error: "No Movie Found using this MovieTitle." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movie." });
  }
});

// // //Filtering All MovieData in the Database using .find()

const readAllMovies = async () => {
  try {
    const allMovieData = await Movie.find();
    console.log(allMovieData);
    return allMovieData;
  } catch (error) {
    console.log(error);
  }
};

app.get("/movies", async (req, res) => {
  try {
    const fetchAllMovieData = await readAllMovies();
    if (fetchAllMovieData) {
      res.status(200).json({
        message: "All MovieData Fetched from the Database.",
        fetchAllMovieData,
      });
    } else {
      res.status(404).json({ error: "No Movies found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to Fetch Movies." });
  }
});

// // //Filtering MovieData in the Database using director Name

const getMovieByDirector = async (directorName) => {
  try {
    const filterByDirector = await Movie.findOne({ director: directorName });
    console.log(filterByDirector);
    return filterByDirector;
  } catch (error) {
    console.log(error);
  }
};

app.get("/movies/director/:directorName", async (req, res) => {
  try {
    const movieDataBydirectorName = await getMovieByDirector(
      req.params.directorName
    );
    if (movieDataBydirectorName) {
      res.status(200).json({
        message: "MovieData Fetched using director Name.",
        movieDataBydirectorName,
      });
    } else {
      res
        .status(404)
        .json({ error: "No Movie Found using this Director Name." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to Fetch Movies using Director Name." });
  }
});

// // //Filtering MovieData in the Database using Movie genre Name

const getMovieByGenreName = async (genreName) => {
  try {
    const filterByGenreName = await Movie.findOne({ genre: genreName });
    console.log(filterByGenreName);
    return filterByGenreName;
  } catch (error) {
    console.log(error);
  }
};

app.get("/movies/genre/:genreName", async (req, res) => {
  try {
    const movieDataByGenreName = await getMovieByGenreName(
      req.params.genreName
    );
    if (movieDataByGenreName) {
      res.status(200).json({
        message: "MovieData Fetched using the genre Name.",
        movieDataByGenreName,
      });
    } else {
      res
        .status(404)
        .json({ error: "No Movie Found Using the this Genre Name." });
    }
  } catch (error) {
    res.status(500).json({ error: "failed to fetch Movies." });
  }
});

const movieToDataBase = async (newMovie) => {
  try {
    const movieData = new Movie(newMovie);
    const SavedMovie = await movieData.save();
    return SavedMovie;
  } catch (error) {
    console.log("Error Seeding to Database.", error);
  }
};

//Upload New Movie Data to the Database.

app.post("/movies", async (req, res) => {
  try {
    const addNewMovieData = await movieToDataBase(req.body);
    res
      .status(201)
      .json({ message: "Added New Movie to the Database.", addNewMovieData });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to Add Movie to the DataBase the Database." });
  }
});

//find a Hotel by id and delete from the database

const deleteMovieById = async (MovieId) => {
  try {
    const MovieById = await Movie.findByIdAndDelete(MovieId);
    console.log(MovieById);
    return MovieById;
  } catch (error) {
    console.log(error);
  }
};

app.delete("/movies/:movieID", async (req, res) => {
  try {
    const deleteSelectedMovieByID = await deleteMovieById(req.params.movieID);
    if (!deleteSelectedMovieByID) {
      res
        .status(404)
        .json({ error: "Movie Not found by Movie ID to be Deleted." });
    } else {
      res.status(201).json({
        message: "Deleted Movie By Using Movie ID.",
        deleteSelectedMovieByID,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to Delete the Movie By Using MovieID" });
  }
});

//Update Movie Release Year in the Database using MovieID

const updateMovieReleaseYear = async (movieID, dataToUpdate) => {
  try {
    const UpdateReleaseYear = await Movie.findByIdAndUpdate(
      movieID,
      dataToUpdate,
      {
        new: true,
      }
    );
    console.log(UpdateReleaseYear);
    return UpdateReleaseYear;
  } catch (error) {
    console.log(error);
  }
};

app.post("/movies/:movieID", async (req, res) => {
  try {
    const updateYear = await updateMovieReleaseYear(
      req.params.movieID,
      req.body
    );
    if (!updateYear) {
      res.status(404).json({ error: "Movie Not Found." });
    } else {
      res.status(201).json({
        message: "Movie Release Year Updated using Movie ID.",
        updateYear,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to Update the Movie Release Year using MovieID.",
    });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server is Running on PORT - ", PORT);
});
