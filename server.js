const Book = require("./models/Book");

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});

mongoose;
mongoose.connect("mongodb://localhost:27017/movies", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

//GET ALL DATA

app.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Add

app.post("/movies", async (req, res) => {
  const movie = new Movie({
    name: req.body.name,
    img: req.body.img,
    summary: req.body.summary,
  });

  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ By Id

app.get("/movies/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send();
    }
    res.send(book);
  } catch (error) {
    res.status(500).send();
  }
});

// Update

app.put("/movies/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Delete

app.delete("/movies/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Movie.findByIdAndDelete(id);
    res.json({ message: "Movie deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
