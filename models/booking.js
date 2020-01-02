const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Booking = new Schema({
    CinemaID: {
        type: ObjectId,
        ref: 'cinemas',
        require: true,
    },
    Position: {
        type: String,
        require: true
    },
    State: {
        type: Boolean,
        require: true
    }
})

module.exports = mongoose.model('booking', Booking);