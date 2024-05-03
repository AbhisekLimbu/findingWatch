// server.js
const express = require('express');
const chatgptRouter = require('./routes/chatgpt');
const tmdbRouter = require('./routes/tmdb');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use('/chatgpt', chatgptRouter); // Mount chatgptRouter
app.use('/tmdb', tmdbRouter); // Mount tmdbRouter

app.get('/', (req, res)=>{
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

