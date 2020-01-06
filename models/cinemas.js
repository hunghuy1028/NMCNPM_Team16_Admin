const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CinemaSchema = new Schema({
    Name: {
        type: String
    }
})

const Cinema = mongoose.model('Cinema', CinemaSchema);

module.exports = Cinema;