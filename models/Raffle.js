const mongoose = require('mongoose');
const raffle = new mongoose.Schema({
    title: String,
    prize: String,
    drawDate: Date,
    imageUrl: { type: String, default: '../frontend/images/raffle_index.jpg' },
});

const Raffle = mongoose.model('Raffle', raffle);

module.exports = Raffle;