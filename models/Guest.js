const mongoose = require('mongoose');
const guestEntry = new mongoose.Schema({
    name: String,
    email: String,
    raffleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Raffle'},
});

const Guest = mongoose.model('Guest', guestEntry);

module.exports = Guest;