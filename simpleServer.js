
const path = require('path');

const express = require('express');
const app = express();
const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";
const port = 8080;

app.use(express.json());
//serve static files like css etc
app.use(express.static(path.join(__dirname,'frontend')));

// Handling 404 errors
app.use((req, res, next) => {
  console.log('Requested URL:', req.url);
  res.status(404).send("test A");
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
  
// Start the server
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});