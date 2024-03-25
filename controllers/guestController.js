//guest controller

const {MongoClient} = require("mongodb");
const uri = process.env.DB_URI;
const Guest = require('../models/Guest')

exports.enterAsGuest = async(req,res) => {
    const{name, email} = req.body;
    try{
        const guest = new Guest({name,email});
        const guestSaved = await guest.save();
        res.status(201).json(guestSaved)
    }catch(error){
        res.status(500).json({error: 'Error with Guest save'})
    }
}