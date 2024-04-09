//guest controller

const Entry = require('../models/Entry');
const Guest = require('../models/Guest');

const { validationResult } = require('express-validator');

exports.enterAsGuest = async(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
  
      return res.status(400).json({ errors: errors.array() });
  
    }
    const{name, email, raffleId} = req.body;
    console.log(req.body);
    try{
        const guest = new Guest({name,email,raffleId});
        const guestSaved = await guest.save();

        const entry = new Entry({raffleId:guestSaved.raffleId, guestToken: guestSaved.token});
        const entrySaved = await entry.save();

        res.status(201).json({
            guest:guestSaved,
            entry:entrySaved
        });

    }catch(error){
        res.status(500).json({error: 'Error with Guest save'})
    }
}