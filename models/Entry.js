const mongoose = require('mongoose');

const entry = new mongoose.Schema({
    
    raffleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Raffle'},
});

const Entry = mongoose.model('Entry', entry);

module.exports = Entry;