
//main server file that initialises the app 

const path = require('path');

const express = require('express');
const app = express();
const { MongoClient } = require("mongodb");
const mongoose = require('mongoose');


require('dotenv').config();


const port = process.env.PORT || 8080;

//mongodb connection uri 
const uri = process.env.DB_URI;

const User = require('./models/User');
const Guest = require('./models/Guest')

app.use(express.json());
//serve static files like css etc
app.use(express.static(path.join(__dirname, 'frontend', 'view')));

// serve images
app.use('/images',express.static(path.join(__dirname, 'frontend', 'images')));


// Start the server
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


// Handling 404 errors
app.use((req, res, next) => {
  console.log('Requested URL:', req.url);
  res.status(404).send("test A");
});
