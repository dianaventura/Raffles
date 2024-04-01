




document.addEventListener('DOMContentLoaded', function () {


  const signupForm = document.getElementById('signup-form');


  signupForm.addEventListener('submit', function (event) {

      event.preventDefault(); // Prevent the default form submit action

      
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
      .then(response => response.json())
      .then(data => {
          console.log('Success:', data);
          alert('OMGG !!! gURL. You have signed up tysm');
          window.location.href = 'index.html';
      })
      .catch((error) => {
          console.error('Error:', error);
         
          alert('That. did not work ');

      });

  });
  
});
