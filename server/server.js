// server.js
const express = require('express');
const cors = require('cors');
const chatgptRouter = require('./routes/chatgpt');
const tmdbRouter = require('./routes/tmdb');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3002;
app.use(cors());

app.use(express.json());

app.use('/chatgpt', chatgptRouter);
app.use('/tmdb', tmdbRouter);

app.get('/', (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
