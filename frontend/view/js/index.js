
function fetchRaffles(){
    console.log('Fetching raffles...'); // Log before fetch
    fetch('/get-raffles')
    
        .then(response => response.json())
        
        .then(raffles => displayRaffles(raffles))
        .catch(error => console.error('Error fetching raffles', error));
}



function displayRaffles(raffles) {
    console.log(raffles); // log the raffles array
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
                <form class="raffle-entry-form">
                
                <input type="text" name="guest-name" required placeholder ="Enter your name">
                <input type="email" name="guest-email" required placeholder="Enter your email">
                <input type="hidden" name="raffleId" value="${raffle._id}">

                <button type="submit">Enter This Raffle!!</button>
            </form>
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

            console.log(name);
            console.log(email);
            console.log(raffleId)
            
            var guestData = {
                name: name,
                email: email,
                raffleId: raffleId
            };

            console.log(guestData)
        
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

                alert('girl im so sorry an error occurred. please try again!');
            });
        }
    });
    
    });
    