const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cinema = new Schema({
    Name: {
        type: String
    }
})

module.exports = mongoose.model('cinemas', Cinema);