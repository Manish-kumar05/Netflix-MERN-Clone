const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/trending", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.TMDB_API_KEY}`
    );

    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch trending movies",
      error: error.message,
    });
  }
});

router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;

    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${query}`
    );

    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({
      message: "Failed to search movies",
      error: error.message,
    });
  }
});

module.exports = router;