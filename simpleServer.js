
//main server file that initialises the app 

const path = require('path');

const express = require('express');
const app = express();
const { MongoClient } = require("mongodb");
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
//routes
const guestRoutes = require('./routes/guestRoutes');
const raffleRoutes = require('./routes/raffleRoutes');
const userRoutes = require('./routes/userRoutes');

require('dotenv').config();


const port = process.env.PORT || 8080;

//mongodb connection uri 
const uri = process.env.DB_URI;

const secret = process.env.SESSION_SECRET;
console.log("Session secret:", secret);

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(session({

  secret: secret,
  resave: false,
  saveUninitialized: false,

}));



//serve static files like css etc
app.use(express.static(path.join(__dirname, 'frontend', 'view')));

// serve images
app.use('/images',express.static(path.join(__dirname, 'frontend', 'images')));



mongoose.connect(uri, {
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));




app.use(guestRoutes);
app.use(raffleRoutes);
app.use(userRoutes);

//Start the server
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


// Handling 404 errors
app.use((req, res, next) => {
  console.log('Requested URL:', req.url);
  res.status(404).send("test A");
});
