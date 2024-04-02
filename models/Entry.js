const mongoose = require('mongoose');

const entry = new mongoose.Schema({

       //not required for guest 
    userId:{ type: mongoose.Schema.Types.ObjectId, default: null},
    raffleId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Raffle', required: true},
 
    //not required for user
    guestToken:{type:String, default:null},

    entryDate:{type:Date, default:Date.now},

    winner:{type:Boolean, default:false}

});

const Entry = mongoose.model('Entry', entry);

module.exports = Entry;