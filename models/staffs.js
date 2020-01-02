const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Staff = new Schema({
    Name: {
        type: String
    },
    Gender: {
        type: Boolean
    },
    Phone: {
        type: String
    },
    Username: {
        type: String,
        require: true,
        unique: true
    },
    Password: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('staffs', Staff);