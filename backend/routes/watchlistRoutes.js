const express = require("express");
const Watchlist = require("../models/Watchlist");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Add movie to watchlist
router.post("/", protect, async (req, res) => {
  try {
    const { movieId, title, posterPath, overview, releaseDate } = req.body;

    const alreadyAdded = await Watchlist.findOne({
      user: req.user._id,
      movieId,
    });

    if (alreadyAdded) {
      return res.status(400).json({ message: "Movie already in watchlist" });
    }

    const movie = await Watchlist.create({
      user: req.user._id,
      movieId,
      title,
      posterPath,
      overview,
      releaseDate,
    });

    res.status(201).json({
      message: "Movie added to watchlist",
      movie,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get user watchlist
router.get("/", protect, async (req, res) => {
  try {
    const movies = await Watchlist.find({ user: req.user._id });

    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Remove movie from watchlist
router.delete("/:movieId", protect, async (req, res) => {
  try {
    const movie = await Watchlist.findOneAndDelete({
      user: req.user._id,
      movieId: req.params.movieId,
    });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found in watchlist" });
    }

    res.json({ message: "Movie removed from watchlist" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;