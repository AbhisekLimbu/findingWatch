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
app.post('/find-complexity', async (req, res) => {
  const prompt = "give me five fruits name?";
    try {
        // Handling for the "find-complexity" endpoint goes here
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              "role": "user",
              "content": req.body.text // Assuming the text to be analyzed is in the request body
            }
          ],
          temperature: 1,
          prompt: prompt,
          max_tokens: 256,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });

        // Send the response from OpenAI chat completions back to the client
        console.log(response.data);
        return res.json(response.data);
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
