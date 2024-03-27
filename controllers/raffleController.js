// raffle controller

const Raffle = require('../models/Raffle')

exports.getRaffles = async(req,res) => {
    try{
        
        const raffles = await Raffle.find(); //fetch all raffles from backend
        res.status(200).json(raffles)
    }catch(error){
        res.status(500).json({error: 'Could not find raffles'});
    }
}