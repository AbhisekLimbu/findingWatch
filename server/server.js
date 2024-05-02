const express = require('express');
const axios = require('axios');
const { OpenAI } = require("openai");
const port = process.env.PORT || 3001;

require("dotenv").config();

const app = express();
app.use(express.json());

// Initialize OpenAI with API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// TMDB API key
const tmdbApiKey =process.env.TMDB_API_key;

app.get('/find-complexity', async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "user",
          "content": "1 which published in year 2011, korean Drama Name"
        }
      ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const movieName = response.choices[0].message.content;
    console.log("Movie Name:", movieName);
    
    const tmdbUrl = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&query=${encodeURIComponent(movieName)}`;

    const tmdbResponse = await axios.get(tmdbUrl);
    const movieData = tmdbResponse.data.results[0]; // Assuming the first result is the desired movie
    
    if (movieData) {
      const posterPath = movieData.poster_path;
      if (posterPath) {
        const posterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;
        const encodedPosterUrl = encodeURIComponent(posterUrl);
        
        return res.json({ posterUrl: encodedPosterUrl });
      } else {
        return res.status(404).json({ error: 'Poster not found' });
      }
    } else {
      return res.status(404).json({ error: 'Movie not found' });
    }
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


let person1 = { name : "steve"};
const map  = new map();
map.set(person, "this is steve")