const mongoose = require('mongoose');
const raffle = new mongoose.Schema({
    title: String,
    prize: String,
    drawDate: Date,
    imageUrl: String,
});

const Raffle = mongoose.model('Raffle', raffle);

module.exports = Raffle;