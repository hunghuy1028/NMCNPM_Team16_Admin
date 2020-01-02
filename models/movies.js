const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Movie = new Schema({
    Name: {
        type: String,
        require: true
    },
    Length: {
        type: Number
    },
    CategoryID: {
        type: ObjectId,
        require: true,
        ref: 'Categories'
    },
    Director: {
        type: String
    },
    Trailer: {
        type: String
    },
    Year: {
        type: Number
    },
    Description: {
        type: String
    }
})

module.exports = mongoose.model('Movies', Movie);