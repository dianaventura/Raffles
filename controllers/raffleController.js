// raffle controller

const {MongoClient} = require("mongodb");
const uri = process.env.DB_URI;
const Raffle = require('../models/Raffle')

exports.getRaffles = async(req,res) => {
    try{
        
        const raffles = await Raffle.find(); //fetch all raffles from backend
        res.status(201).json(raffles)
    }catch(error){
        res.status(500).json({error: 'Could not find raffles :('})
    }
}