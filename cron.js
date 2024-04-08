const cron = require('node-cron');
const raffleController = require('./controllers/raffleController');



cron.schedule('* * * * *', async () => {
    console.log('Checking for raffles ');
    await raffleController.getExpiredRaffles();

    
  });
  