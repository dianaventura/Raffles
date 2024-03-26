
function fetchRaffles(){
    console.log('Fetching raffles...'); // Log before fetch
    fetch('/get-raffles')
    
        .then(response => response.json())
        .then(raffles => displayRaffles(raffles))
        .catch(error => console.error('Error fetching raffles', error));
}

function displayRaffles(raffles) {
    //get raffle container

    const container = document.getElementById('raffle-container');
    //clear
    container.innerHTML = ''; 

    raffles.forEach(raffle => {
        const raffleHTML = `
            <div class="raffle-card">

                <img src="${raffle.imageUrl}" alt="Raffle" class="raffle-image">
                <h3>${raffle.title}</h3>
                <p>Prize: ${raffle.prize}</p>
                <p>Draw Date: ${raffle.drawDate}</p>
                <button onclick="enterRaffleAsGuest('${raffle.id}')">Enter This Raffle</button>
            </div>
        `;
        container.innerHTML += raffleHTML;
    });
}


//handling html makeing fetch



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

// this is called from rafflecards
function enterRaffleAsGuest(raffleId) {

    const name = prompt("Please enter your name:");
    const email = prompt("Please enter your email:");

    if (!email || !name) {
        alert('Please enter an email and name to sign up!');
        return;
    }

    const guestData = {
        name: name,
        email: email,
        raffleId: raffleId 
    };

    fetch('/enter-as-guest', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(guestData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('You have been entered into the raffle!');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again!');
    });
}


document.addEventListener('DOMContentLoaded', (event) => {

    fetchRaffles(); //fetches and displayes raffles 
    
    });
    