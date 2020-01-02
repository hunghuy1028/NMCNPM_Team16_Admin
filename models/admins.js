const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Admin = new Schema({
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

module.exports = mongoose.model('Admins', Admin);