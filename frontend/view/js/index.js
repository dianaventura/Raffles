
function fetchRaffles(){

    fetch('/session', { credentials: 'include' })
        .then(response => response.json())

        .then(session => {
            console.log('Session data received:', session);

            fetch('/get-raffles', { credentials: 'include' })
               // console.log('Fetching raffles...'); // Log before fetch
            .then(response => response.json())
            
            .then(raffles => {

                displayRaffles(raffles,session);
                updateHome(session);
            })
            .catch(error => console.error('Error fetching raffles', error));
    
        })

        .catch(error => console.error('Error checking session', error));
}

function updateHome(session) {

    const loginButt = document.getElementById('login-btn');
    const signupButt = document.getElementById('signup-btn');
    const helloUser = document.getElementById('hello-user');
  
    if (session.loggedIn) {

        // hiding login and signup buttons

        loginButt.style.display = 'none';
        signupButt.style.display = 'none';

        // show the username hello 

        helloUser.style.display = 'block';
        document.getElementById('user-display').textContent = `Welcome, ${session.username}!`;

    } else {
        
        // hide hello-user section
       helloUser.style.display = 'none';
    }
}




function displayRaffles(raffles, session) {
    //console.log(raffles); // log the raffles array
    console.log('User is logged in:', session.loggedIn);

    //get raffle container

    const container = document.getElementById('raffle-container');
    //clear
    container.innerHTML = ''; 

    raffles.forEach(raffle => {
            //if logged in show only button else show guest form :) 
        const formOrButton = session.loggedIn ?
            `<button onclick="enterRaffleAsUser('${raffle._id}')">Enter This Raffle</button>` :
            `
            <form class="raffle-entry-form">
                <input type="text" name="guest-name" required placeholder="Enter your name">
                <input type="email" name="guest-email" required placeholder="Enter your email">

                <input type="hidden" name="raffleId" value="${raffle._id}">

                <button type="submit">Enter This Raffle!!</button>
            </form>
            `;

        const raffleHTML = `
            <div class="raffle-card">
                <img src="${raffle.imageUrl}" alt="Raffle" class="raffle-image">
                <h3>${raffle.title}</h3>
                <p>Prize: ${raffle.prize}</p>
                <p>Draw Date: ${raffle.drawDate}</p>

                ${formOrButton}

            </div>
        `;

        container.innerHTML += raffleHTML;
    });


}




document.addEventListener('DOMContentLoaded', (event) => {

    fetchRaffles(); //fetches and displayes raffles 



    document.getElementById('raffle-container').addEventListener('submit', function(event) {

        if (event.target.matches('.raffle-entry-form')) {

            event.preventDefault();
            
            const formData = new FormData(event.target);
            const name = formData.get('guest-name');
            const email = formData.get('guest-email');
            const raffleId = formData.get('raffleId');

            //console.log(name);
            //console.log(email);
            // console.log(raffleId)
            
            var guestData = {
                name: name,
                email: email,
                raffleId: raffleId
            };

            //console.log(guestData)
        
            // post request to server side 
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

                alert('OMGG !!! gURL. You have been entered into the raffle!');
            })
            .catch((error) => {
                console.error('Error:', error);

                alert('girl. im so sorry an error occurred. please try again!');
            });
        }
    });

    document.getElementById('logout-btn').addEventListener('click', function (event) {
        
        event.preventDefault(); 
      
        // Send request to log out 
        fetch('/logout', {

            method: 'GET',
            credentials: 'include'
        })
        .then(response => {

            if (response.ok) {

                window.location.href = 'index.html'; 
            } else {
                console.error('Error logging out:', response.status); 
            }
        })
        .catch(error => console.error('Error logging out:', error)); // Log fetch error
    });

    
});
    