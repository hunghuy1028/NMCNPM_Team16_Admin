const mongoose = require('mongoose');

const Movie = new mongoose.Schema({
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
    Comingsoon: {
        type: Boolean
    },
    Poster: {
        type: String
    },
    Cover: {
        type: String
    }
})

Movie.methods.newMovie = function(movie, next) {
    (this).model('Movie').create({
        Name: movie.Name,
        Length: movie.Length,
        Director: movie.Director,
        Category: movie.Category,
        Trailer: movie.Trailer,
        Year: movie.Year,
        Description: movie.Description,
        Comingsoon: movie.Comingsoon,
        Poster: movie.Poster,
        Cover: movie.Cover
    }, (err, res) => {
        if (err) {
            console.log(err);
            return next(err);
        } else return next(null);
    })
};

Movie.methods.removeOne = function(id, next) {
    (this).model('Movie').deleteOne({
        _id: id
    }, (err) => {
        if (err) {
            return next(err);
        } else return next(null);
    })
};

module.exports = mongoose.model('Movie', Movie);