const mongoose = require('mongoose');

const prize = new mongoose.Schema({
    userId: {type:mongoose.Schema.Types.ObjectId, ref:'User', default:null},
    guestToken:{type:String, default:null},
    raffleId:{type:mongoose.Schema.Types.ObjectId, ref:'Raffle', required:true},
    claimed: {type: Boolean, default: false},
    claimDate:{type:Date,default:Date.now}
})

const Prize = mongoose.model('Prize', prize);

module.exports = Prize;