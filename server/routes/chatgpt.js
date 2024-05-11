const express = require('express');
const { OpenAI } = require("openai");
const cors = require('cors');
const router = require('./chatgpt');
require("dotenv").config();

// Initialize OpenAI instance
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Create Express app
const app = express();
app.use(cors());
app.use(express.json());

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Function to handle form data
const handleFormData = async (req, res) => {
  try {
    const { actor, actress, genre, director, year } = req.body;
    console.log("Received data:", actor, actress, genre, director, year);
    
    // Store form data
    req.formData = { actor, actress, genre, director, year };

    res.json({ success: true });
  } catch (error) {
    console.error("Error processing form data:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to generate response based on form data
const generateResponse = async (req, res) => {
  try {
    // Extract form data from the request object
    const { actor, actress, genre, director, year } = req.formData || {};

    const message = `Could you please give me the Korean drama name played by ${actor || ""} actor and played ${actress || ""} actress and genre = ${genre || ""} and directed by ${director || ""} produced in this ${year || ""} if it exists.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ "role": "user", "content": message }],
      max_tokens: 256,
      temperature: 0.7,
      top_p: 1,
      presence_penalty: 0,
    });

    const movieName = response.choices[0].message.content.trim();
    console.log("Movie Name:", movieName);

    const isValidResponse = movieName.toLowerCase().includes("drama");
    console.log("Is Valid Response:", isValidResponse);

    if (isValidResponse) {
      res.json({ movieName });
    } else {
      res.json({ error: "No such drama found." });
    }
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Define routes
app.post('/', handleFormData);
app.get('/', generateResponse);

module.exports = app;
