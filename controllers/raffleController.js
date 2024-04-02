// raffle controller

const Raffle = require('../models/Raffle');
const User = require('../models/User');

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