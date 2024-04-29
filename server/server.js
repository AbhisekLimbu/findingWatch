const express = require('express');
const { OpenAI } = require("openai"); // Import OpenAI from "openai"
const port = process.env.PORT || 3001;

// Load environment variables from .env file
require("dotenv").config();

// Create Express app
const app = express();

app.use(express.json());

// Initialize OpenAI with API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define route for handling POST requests to /find-complexity
app.get('/find-complexity', async (req, res) => {
  try {
    // Handling for the "find-complexity" endpoint goes here
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "user",
          "content": "fruits name" // Ensure that userInput is not null
        }
      ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    // Send the response from OpenAI chat completions back to the client
    return res.json({ response: response.choices[0].message.content });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
});

// Define a route for handling errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
