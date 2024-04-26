// Import required modules
const express = require('express');

// Create Express app
const app = express();

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello, World!'); // Send a simple response
});

// Define a route for handling 404 errors (Page Not Found)
app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});

// Define a route for handling errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const port = process.env.PORT || 3001; // Use port from environment variable or default to 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
