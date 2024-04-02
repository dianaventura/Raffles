document.addEventListener('DOMContentLoaded', function () {
    const createRaffleForm = document.getElementById('raffle-form');
  
    createRaffleForm.addEventListener('submit', function (event) {

      event.preventDefault(); // Prevent the default form submit action
      
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
      .then(response => response.json())

      .then(data => {
        console.log('Success:', data);

        alert('Yaaaa raffle has been created!');
        window.location.href = 'index.html'; // redirect to homepage where raffle should display
      })
      .catch((error) => {
        console.error('Error:', error);
        alert(' error creating the raffle.');

      });

    });

  });
  