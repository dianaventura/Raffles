
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
    const createRaffle = document.getElementById('create-raffle-btn');
  
    if (session.loggedIn) {

        // hiding login and signup buttons

        loginButt.style.display = 'none';
        signupButt.style.display = 'none';

        // show the username hello 

        helloUser.style.display = 'block';
        document.getElementById('user-display').textContent = `Welcome, ${session.username}!`;
        //show create raffle option

        createRaffle.style.display = 'block'; 

    
    } else {
        
        // hide hello-user section
       helloUser.style.display = 'none';
       createRaffle.style.display = 'none';
    }

}




function displayRaffles(data, session) {
    //console.log(data); // log the raffles array
    console.log('User is logged in:', session.loggedIn);

    if(session.loggedIn && data.raffles && data.raffleIds){
        raffles = data.raffles;
        enteredRaffles = data.raffleIds;

    }

    //get raffle container

    const container = document.getElementById('raffle-container');
    //clear
    container.innerHTML = ''; 

    raffles.forEach(raffle => {

        const entered = enteredRaffles.includes(raffle._id.toString());
            //if logged in show only button else show guest form :) 
        const formOrButton = session.loggedIn ?
            `<button class="enter-user-btn" raffleId="${raffle._id}">Enter This Raffle</button>`  +
            (entered ? `<button class="withdraw-user-btn" raffleId="${raffle._id}">Withdraw</button>` : '') :
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

    enterButtonListeners();

    if(session.loggedIn){
        withdrawButtonListeners();
    }

        


}



function enterButtonListeners(){
    const container = document.getElementById('raffle-container');
//for each "enter as user" button
    const userEnter = container.querySelectorAll('.enter-user-btn');

    userEnter.forEach(button => {

        button.addEventListener('click', function (event) {
            event.preventDefault();
            
            const raffleId = button.getAttribute('raffleId');
        

            console.log(raffleId);

           
            
            // request to enter as a user

            fetch('/enter-as-user', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ raffleId})

                
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('problem! ');
                }
            })
            .then(data => {
                alert('giiiirl have been entered into the raffle!');
            })
            .catch(error => {
                console.error('Error:', error);

                alert('error, please try again!');
            });

        });

    });
}

function withdrawButtonListeners(){

    const withdrawButtons = document.querySelectorAll('.withdraw-user-btn');

    withdrawButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const raffleId = this.getAttribute('raffleId');
            console.log('Withdrawing  from raffle...', raffleId);

        fetch('/withdraw-user', { 

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', 

            body: JSON.stringify({ raffleId }),
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log('Withdrawal successful:', data);

            alert('girrrllll you have been withdrawn from the raffle');

            button.parentElement.removeChild(button); 
            
        })
        .catch(error => {
            console.error('Error:', error);
            alert('an error occured');
        });

        });
    });
}

function fetchAndDisplayWinners() {
    //testing

    fetch('/get-winners', {

        credentials: 'include' 
    })
    .then(response => response.json())
    .then(winners => {
        if (winners.length > 0) {
            winners.forEach(winner => {
                
                console.log(`winner Announcement!!!: The winner of ${winner.raffleTitle} is ${winner.winnerName}! Prize: ${winner.prize}`);
               
                alert(`winner Announcement!!: The winner of ${winner.raffleTitle} is ${winner.winnerName}! Prize: ${winner.prize}`);
            });
        }
    })
    .catch(error => console.error('error getting winners:', error));
}

document.addEventListener('DOMContentLoaded', (event) => {

    fetchRaffles(); //fetches and displayes raffles 
    setInterval(fetchAndDisplayWinners, 60000); //check for winnas



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
      
        // send request to log out 
        fetch('/logout', {

            method: 'POST',
    
        })
        .then(response => {

            if (response.ok) {

                window.location.href = 'index.html'; 
                console.log('YOU HAVE BEEN LOGGED OUT ?')
            } else {
                console.error('Error logging out:', response.status); 
            }
        })
        .catch(error => console.error('Error logging out:', error)); // Log fetch error
    });


  

    
});
    