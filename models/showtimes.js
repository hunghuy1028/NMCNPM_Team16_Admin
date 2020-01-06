const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Movie = require('./movies');

const ShowtimeSchema = new Schema({
    MovieID: {
        type: String,
        require: true,
        ref: 'movies'
    },
    Time: {
        type: Date,
        require: true
    },
    CinemaID: {
        type: String,
        require: true,
        ref: 'cinemas'
    }
})

ShowtimeSchema.methods.newShowtime = async function(info, next) {
    const allShows = Showtime.find({});
    console.log(allShows);
    allShows.forEach(async (show) => {
        if (show.CinemaID == info.CinemaID) {
            const thisShowtime = info.time.getTime();
            const prevShowtime = show.time.getTime();
            const prevMovie = await Movie.findById(show.MovieID);
            const timeBefore = prevShowtime + prevMovie.Length * 60 * 1000;
            if ((thisShowtime > prevShowtime) && (thisShowtime < timeBefore)) {
                next("Invalid Time");
            }
            const thisMovie  = await Movie.findById(info.movie);
            const timeAfter = thisShowtime + thisMovie.Length * 60 * 1000;
            if ((prevShowtime > thisShowtime) && (prevShowtime < timeAfter)) {
                next("Invalid Time");
            }
        }
    })
    (this).model('Showtime').create({
        MovieID: info.movie,
        Time: info.time,
        CinemaID: info.cinema,
    }, (err, res) => {
        if (err) {
            console.log(err);
            return next(err);
        } else return next(null);
    })
};

ShowtimeSchema.methods.removeShowtime = function(id, next) {
    (this).model('Showtime').deleteOne({
        _id: id
    }, (err) => {
        if (err) {
            return next(err);
        } else return next(null);
    })
};

const Showtime = mongoose.model('Showtime', ShowtimeSchema);

module.exports = Showtime;