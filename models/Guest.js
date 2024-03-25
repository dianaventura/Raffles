const mongoose = require('mongoose');
const guestEntry = new mongoose.Schema({
    name: String,
    email: String,
});

const Guest = mongoose.model('Guest', GuestEntry);

module.exports = Guest;