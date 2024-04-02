const mongoose = require('mongoose');
const raffle = new mongoose.Schema({
    title: { type: String, required: true},
    prize: { type: String, required: true},
    drawDate: {type: Date, required: true},
    imageUrl: { type: String, default: '../frontend/images/raffle_index.jpg' },
});

const Raffle = mongoose.model('Raffle', raffle);

module.exports = Raffle;