const express = require('express');
const axios = require('axios');
const { OpenAI } = require("openai");
const port = process.env.PORT || 3001;



const axios = require('axios');

// TMDB API key
const tmdbApiKey = process.env.TMDB_API_KEY;

async function getMoviePosterUrl(movieName) {
  try {
    const tmdbUrl = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&query=${encodeURIComponent(movieName)}`;
    const tmdbResponse = await axios.get(tmdbUrl);
    const movieData = tmdbResponse.data.results[0]; // Assuming the first result is the desired movie
    
    if (movieData) {
      const posterPath = movieData.poster_path;
      if (posterPath) {
        return `https://image.tmdb.org/t/p/original/${posterPath}`;
      } else {
        throw new Error('Poster not found');
      }
    } else {
      throw new Error('Movie not found');
    }
  } catch (error) {
    throw new Error('Error fetching movie details:', error);
  }
}

module.exports = { getMoviePosterUrl };
