//guest controller

const Guest = require('../models/Guest');

exports.enterAsGuest = async(req,res) => {
    const{name, email, raffleId} = req.body;
    console.log(req.body);
    try{
        const guest = new Guest({name,email,raffleId});
        const guestSaved = await guest.save();
        res.status(201).json(guestSaved)
    }catch(error){
        res.status(500).json({error: 'Error with Guest save'})
    }
}