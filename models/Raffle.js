const mongoose = require('mongoose');
const raffle = new mongoose.Schema({
    title: { type: String, required: true},
    prize: { type: String, required: true},
    drawDate: {type: Date, required: true},
    drawn: { type: Boolean, default: false },
    winnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    imageUrl: { type: String, default: 'https://media.istockphoto.com/id/1342027534/vector/enter-to-win-ticket.jpg?s=612x612&w=0&k=20&c=cFIRMI6v-8R7U6tNderoGu-IuDszgHLoybrojgKpLr4=' },
});

const Raffle = mongoose.model('Raffle', raffle);



module.exports = Raffle;