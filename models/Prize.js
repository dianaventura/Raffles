const mongoose = requier('mongoose');

const prize = new mongoose.Schema({
    userId: {type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    raffleId:{type:mongoose.Schema.Types.ObjectId, ref:'Raffle', required:true},
    claimed: {type: Boolean, default: false},
    claimDate:{type:Date,default:Date.now}
})

const Prize = mongoose.model('Prize', Prize);

module.exports = Prize;