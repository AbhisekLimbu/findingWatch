const express = require('express');
require("dotenv").config();
const port = process.env.PORT || 3001;
const { Configuration, OpenAIApi } = require("openai"); // Fixed typo in require statement

// Create Express app
const app = express();

app.use(express.json());

// Corrected typo in Configuration and OpenAIApi class names
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // Corrected environment variable name
});
const openai = new OpenAIApi(configuration);

// Define route for handling POST requests to /find-movie
app.post('/find-complexity', async (req, res) => {
    try {
        // Handling for the "find-movie" endpoint goes here
        return res.status(200).json({
            message: "working",
        });
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
