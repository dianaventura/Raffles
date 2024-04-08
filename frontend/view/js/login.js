




document.addEventListener('DOMContentLoaded', function () {


    const loginForm = document.getElementById('login-form');
  
  
    loginForm.addEventListener('submit', function (event) {
  
        event.preventDefault();
  
        
        const formData = new FormData(loginForm);

        const username = formData.get('username');
        const password = formData.get('password');
  
  
        var userData = {
  
          username: username,
          password: password
  
        };
  
    
       //post request to server side
  
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(userData)
        })
        .then(response => {

            if (!response.ok) {
       
                return response.json().then(data => Promise.reject(data.message));
            }
            return response.json();

        })
        .then(data => {
            console.log('Success:', data);


            localStorage.setItem('userId',data.user);
            if (data.prizes && data.prizes.length > 0) {
                localStorage.setItem('unclaimedPrizes', JSON.stringify(data.prizes));
            }
            
           
                alert('OMGG !!! gURL. You have been logged in tysm');
                window.location.href = 'index.html';


        })
        .catch((error) => {
            console.error('Error:', error);
           
            alert(error);
  
        });
  
    });
    
  });

  