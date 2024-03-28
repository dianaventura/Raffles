const mongoose = require('mongoose');

const crypto = require('crypto');

const guestEntry = new mongoose.Schema({
    name: String,
    email: String,
    raffleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Raffle'},
    token: {type: String, unique: true}
});

const Guest = mongoose.model('Guest', guestEntry);

//hook to generate token when a guest is entered.
guestEntry.pre('save', function(next) {

    if (!this.token) {

        this.token = crypto.randomBytes(16).toString('hex');

    }

    next();
});

module.exports = Guest;