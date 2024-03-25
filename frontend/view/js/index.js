//handling html makeing fetch
document.addEventListener('DOMContentLoaded', (event) => {
document.getElementById('raffle-entry').addEventListener('submit', function(event) {
 
    event.preventDefault();

    var name = document.getElementById('guest-name').value;
    var email = document.getElementById('guest-email').value;
 


    //using input to 

    if(email.length == 0|| name.length == 0){
        alert('Please enter an email, password and name to sign up !');
        
    }else{
        console.log('Adding user info ')
      var guestData = {
        name: name,
        email: email,
      
    };

    //post request to server side 

    fetch('/enter-as-guest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(guestData)
  })
  .then(response => response.json() )
  .then(data => {
    console.log('Success:', data);
    alert('You have been entered into the raffle!')

  })
  .catch((error)=> {
    console.error('Error', error);
    alert('An error occured. Please try again!!! ')
  });

}

});

});