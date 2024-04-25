// Import required modules
const express = require('express');

// Create Express app
const app = express();

// Define routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
const port = process.env.PORT || 3000; // Use port from environment variable or 3000 by default
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
