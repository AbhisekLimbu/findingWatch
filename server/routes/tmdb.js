// tmdb.js
const express = require('express');
const axios = require('axios');
const router = express.Router();
require("dotenv").config();

const tmdbApiKey = process.env.TMDB_API_KEY;

router.get('/find-movie-poster/:movieName', async (req, res) => {
  try {
    const movieName = req.params.movieName;
    const tmdbUrl = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&query=${encodeURIComponent(movieName)}`;
    const tmdbResponse = await axios.get(tmdbUrl);
    const movieData = tmdbResponse.data.results[0];
    
    if (movieData) {
      const posterPath = movieData.poster_path;
      if (posterPath) {
        const posterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;
        return res.json({ movieName, posterUrl });
      } else {
        throw new Error('Poster not found');
      }
    } else {
      throw new Error('Movie not found');
    }
  } catch (error) {
    console.error('Error fetching movie details:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
