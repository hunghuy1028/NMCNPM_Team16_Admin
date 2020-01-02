const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new Schema({
    Name: {
        type: String,
        require: true,
        unique: true
    }
})

module.exports = mongoose.model('Categories', Category);