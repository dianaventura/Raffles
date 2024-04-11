




document.addEventListener('DOMContentLoaded', function () {


  const signupForm = document.getElementById('signup-form');


  signupForm.addEventListener('submit', function (event) {

      event.preventDefault();

      
      const formData = new FormData(signupForm);
      const username = formData.get('username');
      const email = formData.get('email');
      const password = formData.get('password');


      var userData = {

        username: username,
        email: email,
        password: password

      };

  
     //post request to server side

      fetch('/signup', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(userData)
      })
      .then(response => {
        
        if (response.ok) {
            return response.json();

          } else {
            //handle errors here
            return response.json().then(err => {
              throw err;
            });
          }

      })
      .then(data => {

          console.log('Success:', data);
          alert('Hey ! Thanks so much for signing up! ');
          
          window.location.href = 'index.html';

      })
      .catch((error) => {
          console.error('Error:', error);

          //if there are any errors in the response tell the user

          const errorMessages = error.errors ? error.errors.map(e => e.msg).join('\n') : 'Something Weird Happened ! Please try again.';
            alert(errorMessages);
         


      });

  });
  
});
