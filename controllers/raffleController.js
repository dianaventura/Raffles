// raffle controller

const Raffle = require('../models/Raffle');
const User = require('../models/User');
const Guest = require('../models/Guest');
const Entry = require('../models/Entry');

exports.getRaffles = async(req,res) => {
    try{
        
        const raffles = await Raffle.find(); //fetch all raffles from backend
        res.status(200).json(raffles)
    }catch(error){
        res.status(500).json({error: 'Could not find raffles'});
    }
}

exports.createRaffle = async(req,res) =>{

    try{
  
    const { title, prize, drawDate } = req.body;

    const userId = req.session.userId;



    const newRaffle = new Raffle({

        title,
        prize,
        drawDate
    });
  
      const savedRaffle = await newRaffle.save();
        //update user to raffleHolder :) 
      await User.findByIdAndUpdate(userId, { $set: { role: 'raffleHolder' } });

      res.status(201).json({ message: 'raffle created ', data: savedRaffle });
      
 
    } catch (error) {

  
      console.error('error with craeting raffle', error);
      res.status(500).json({ message: 'internal server error' });
    }
      
    };


    exports.getExpiredRaffles = async function(){

    const now = new Date();
    console.log(now);
    const expiredRaffles = await Raffle.find({ drawDate: { $lte: now }, drawn: false });
    console.log(expiredRaffles);

    for (const raffle of expiredRaffles) {
   
    const winnerId = await setWinner(raffle);
    //  mark the raffle as drawn and delete guest entries
    await Raffle.findByIdAndUpdate(raffle._id, { winnerId, drawn: true });

    await Guest.deleteMany({ raffleId: raffle._id });

    console.log(`Processed draw for raffle: ${raffle.title}`);
    console.log(raffle._id);
    console.log(`The Winner for: ${raffle.title} is :  ${winnerId}`);
    }
    };

    async function setWinner(raffle){

        try {
            // get all entries for that raffle
            console.log(raffle._id);
            const entries = await Entry.find({ raffleId: raffle._id });

            if (entries.length === 0) {
              console.log('No entries for this raffle.');
              return null;
            }
        
            //for multiple entries
            let weightedEntries = [];

            entries.forEach(entry => {
                console.log(entry.userId);
              weightedEntries.push(entry.userId); 
            });
        
            // randomly select a winner from weightedEntries
            const winnerIndex = Math.floor(Math.random() * weightedEntries.length);
            const winnerId = weightedEntries[winnerIndex];
            console.log(winnerId);
            // update the raffle with the winner's ID
            await Raffle.findByIdAndUpdate(raffle._id, { winnerId: winnerId });
        
            return winnerId;
          } catch (error) {
            console.error('Error finding the winner:', error);
            return null; // Return null to indicate failure
          }

    }