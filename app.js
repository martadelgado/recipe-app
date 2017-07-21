const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.Promise = global.Promise;
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
  console.log("connected to database"+config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log("Database error: " +err);
});


const app = express();

const recipes = require('./routes/recipes');

const port = 3000;

// Cors Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

app.use('/recipes', recipes);

// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// Start Server
app.listen(port, () => {
  console.log("server started on" +port);
});
