
//handling html makeing fetch

document.getElementById('signup').addEventListener('submit', function(event) {
    console.log('hello diana')
    event.preventDefault();

    var name = document.getElementById('signup-name').value;
    var email = document.getElementById('signup-email').value;
    var password = document.getElementById('signup-password').value;




    //using input to create user

    if(email.length == 0|| password.length == 0 || name.length == 0){
        alert('Please enter an email, password and name to sign up !');
        
    }else{
        console.log('Adding user info ')
      var createUser = {
        name: name,
        email: email,
        password: password

      
    };

    //post request to server side 

    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(createUser)
  })
  .then(response => response.json() )
  .then(data => {
    console.log('Success:', data);

  })
  .catch((error)=> {
    console.error('Error', error);
  });

}

});



  
  //adapted from lab 4 
  
  app.post('/signup', async (req, res) => {
    console.log('it is calling')
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
