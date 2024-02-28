

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

    event.preventDefault();

    var name = document.getElementById('signup-name').value;
    var email= document.getElementById('signup-email').value;
    var password = document.getElementById('signup-password').value;




    //sending name email and password to backend

    if(!email || !password|| name){
        alert('Please enter an email, password and name to sign up !');
        
    }else{

      var createUser = {
        name: name,
        email: email,
        password: password

      
    };

    //post request

    fetch('/createUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(createUser)
  })
  .then(response.json())
  .then(data => {
    console.log('Success:', data);

  })
  .catch((error)=> {
    console.error('Error', error);
  });

}

});

