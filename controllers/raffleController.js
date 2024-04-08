// raffle controller

const Raffle = require('../models/Raffle');
const User = require('../models/User');
const Guest = require('../models/Guest');
const Entry = require('../models/Entry');

let winnersQueue =[];

exports.getRaffles = async(req,res) => {
    try{
        
        const raffles = await Raffle.find({drawn:false}); 
        
        const userId = req.session.userId;
        if(userId){
          const enteredRaffles = await Entries.find({ userId: userId }, 'raffleId').lean();
          const raffleIds = enteredRaffles.map(entry => entry.raffleId);
          res.status(200).json({raffles,raffleIds});
        }else{
          res.status(200).json(raffles)
        }
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

    //datetime fix

    const now = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000);

    console.log(now);
    const expiredRaffles = await Raffle.find({ drawDate: { $lte: now },drawn: false});
    console.log(expiredRaffles);

    for (const raffle of expiredRaffles) {
   
    const {winnerName} = await setWinner(raffle);

    //  mark the raffle as drawn and delete guest entries

    if (winnerName) {
        winnersQueue.push({

            winnerName: winnerName,

            raffleTitle: raffle.title,
            
            prize: raffle.prize,
        });

        await Raffle.findByIdAndUpdate(raffle._id, { drawn: true });

        await Guest.deleteMany({ raffleId: raffle._id });
    }


    console.log(`Processed draw for raffle: ${raffle.title}`);
    console.log(raffle._id);
    console.log(`The Winner for: ${raffle.title} is :  ${winnerName}`);
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
        
            /*for multiple entries
            let weightedEntries = [];

            entries.forEach(entry => {
                console.log(entry.userId);
              weightedEntries.push(entry.userId); 
            });
            */
        
            // randomly select a winner from weightedEntries
            const winnerIndex = Math.floor(Math.random() * entries.length);
            console.log('this is the winning entry doc :', entries[winnerIndex])
            
            //const winner = weightedEntries[winnerIndex];
            const winningEntry = entries[winnerIndex];

            //console.log(winner);

            //let winningEntry = await Entry.findById(winningId);
    

            //mark winning entry

            winningEntry.winner = true;
            console.log('this is the winning ticket',winningEntry);
            await winningEntry.save();
            //get winner name

            let winnerName = 'unKnown';

            if(winningEntry.userId){
              const user = await User.findById(winningEntry.userId);
              //if display is unknown user something is wrong
              winnerName = user ? user.username: 'Unknown User';

            }else if (winningEntry.guestToken){
              const guest = await Guest.findOne({token:winningEntry.guestToken});
              const random = Math.floor(Math.random() * 10000);
              winnerName= 'Guest Number ${random}. You will be contacted with the details you used to enter!';
            };
          
           
            // update the raffle with the winner's entry ID
            await Raffle.findByIdAndUpdate(raffle._id, { winnerId: winningEntry._id});

            console.log(`The winner for raffle ${raffle.title} is ${winnerName}`)
        
            return {EntryId: winningEntry._id, winnerName};
          } catch (error) {
            console.error('Error finding the winner:', error);
            return null;
          }

    };

    exports.getWinners = (req, res) => {

      res.json(winnersQueue);

      winnersQueue = [];
    };
  