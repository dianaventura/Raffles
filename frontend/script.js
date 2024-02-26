
const express = require('express');
const app = express();
const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";
const port = 8080;

app.use(express.json());

  document.getElementById('raffle-entry').addEventListener('submit', function(event) {

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;

    if(!name || !email){
        alert('You need a name and an email to enter this raffle');
        event.preventDefault();
    }

  });

  

  document.getElementById('login').addEventListener('submit', function(event) {

    var email= document.getElementById('login-email').value;
    var password = document.getElementById('login-password').value;

    if(!email || !password){
        alert('Please enter an email and a password to log in!');
        event.preventDefault();
    }

  });

  document.getElementById('signup').addEventListener('submit', function(event) {

    var name = document.getElementById('signup-name').value;
    var email= document.getElementById('signup-email').value;
    var password = document.getElementById('signup-password').value;

    if(!email || !password){
        alert('Please enter an email, password and name to sign up !');
        event.preventDefault();
    }

  });

  //adapted from lab 4 
  app.post('/api/databaseAction', async (req, res) => {
  // Database stuff
    // Create a new MongoClient
    const client = new MongoClient(uri);
    async function run() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        // Establish and verify connection
        await client.db("admin").command({ ping: 1 });
        console.log("Connected successfully to server");
        console.log('Start the database stuff');
        //Write databse Insert/Update/Query code here..
 console.log('End the database stuff');

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
    }
    run().catch(console.dir);
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

//adapted from lab 4 

app.post('/createUser', async (req, res) => {
  // Create a new MongoClient
  const client = new MongoClient(uri);
  const { username, email, password } = req.body; // extract user info from request body

  try {
      await client.connect();
      var dbo = client.db("mydb");
      var myobj = { username, email, password }; 
      await dbo.collection("users").insertOne(myobj,function(err,res){

      if(err){
        console.log(err);
        throw err;
      }
      console.log('USER CREATED');
    });
    console.log('End the database stuff')
 
  } finally {
      await client.close();
  }
});