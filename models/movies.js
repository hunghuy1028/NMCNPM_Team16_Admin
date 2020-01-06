const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    Name: {
        type: String,
        require: true
    },
    Length: {
        type: Number
    },
    Category: {
        type: String,
        require: true
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
    },
    Poster: {
        type: String
    }
})

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie