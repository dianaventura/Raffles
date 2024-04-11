const cron = require('node-cron');
const raffleController = require('./controllers/raffleController');

//cron uses the function in the raffle controller to check for raffles that 
//are going off 


cron.schedule('* * * * *', async () => {
    console.log('Checking for raffles ');
    await raffleController.getExpiredRaffles();

    
  });
  