const mongoose = require('mongoose');

const crypto = require('crypto');

const guestEntry = new mongoose.Schema({
    name: String,
    email: String,
    raffleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Raffle'},
    token: {type: String, unique: true}
});



//hook to generate token when a guest is entered.
guestEntry.pre('save', function(next) {

    if (!this.token) {

        this.token = crypto.randomBytes(16).toString('hex');

    }

    next();
});

const Guest = mongoose.model('Guest', guestEntry);

module.exports = Guest;