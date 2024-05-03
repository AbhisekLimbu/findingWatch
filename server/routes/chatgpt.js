// chatgpt.js
const express = require('express');
const { OpenAI } = require("openai");
const chatgptrouter = express.Router();
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

chatgptrouter.get('/find-movie', async (req, res) => {
  try {
    // Your chatgpt logic here
    const response = await openai.chat.completions.create({
      model: "text-davinci-003",
      messages: [
        {
          "role": "user",
          "content": "korean drama" // assuming the question is sent in the request body
        }
      ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const movieName = response.data.choices[0].message.content;
    console.log("Movie Name:", movieName);
    res.json({'moveName': movieName})
    res.redirect(`/tmdb/find-movie-poster/${encodeURIComponent(movieName)}`);
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports =chatgptrouter;
