



document.addEventListener('DOMContentLoaded', function () {
    const createRaffleForm = document.getElementById('raffle-form');
  
    createRaffleForm.addEventListener('submit', function (event) {

      event.preventDefault(); 

      //users are not allowed to submit images for security reasons
      
      const formData = new FormData(createRaffleForm);
      const title = formData.get('title');
      const prize = formData.get('prize');
      const drawDate = formData.get('drawDate');

      

      var raffleData = {
        title: title,
        prize: prize,
        drawDate: drawDate,

      };
  
      // post rafflee
      fetch('/create-raffle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
   
        },
        credentials: 'include',

        body: JSON.stringify(raffleData) 
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

        alert('Yaaaa raffle has been created!');
        window.location.href = 'index.html'; // redirect to homepage where raffle should display
      })
      .catch((error) => {
        console.error('Error:', error);
        
        const errorMessages = error.errors ? error.errors.map(e => e.msg).join('\n') : 'Something Weird Happened ! Please try again.';
        alert(errorMessages);

      });

    });

  });
  