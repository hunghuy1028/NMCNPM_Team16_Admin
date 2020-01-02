const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Showtime = new Schema({
    MovieID: {
        type: ObjectId,
        require: true,
        ref: 'Movies'
    },
    Time: {
        type: Date,
        require: true
    },
    CinemaID: {
        type: ObjectId,
        require: true,
        ref: 'Cinemas'
    }
})

module.exports = mongoose.model('Showtimes', Showtime);