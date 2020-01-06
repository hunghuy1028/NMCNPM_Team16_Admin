const Showtime = require('../models/showtimes');
const Movie = require('../models/movies');
const Cinema = require('../models/cinemas');

const showtimesController = {};

showtimesController.index = async (req, res, next) => {
	const allShowtimes = await Showtime.find({});
	let MovieList = [], CinemaList = [];
	for (let i=0;i<allShowtimes.length;i++) {
		const movie = await Movie.findById(allShowtimes[i].MovieID);
		const cinema = await Cinema.findById(allShowtimes[i].CinemaID);
		MovieList.push(movie.Name);
		CinemaList.push(cinema.Name);
	}
	res.render('showtimes', { 
		action: "Suất chiếu", 
		allShowtimes, MovieList, CinemaList
	});
};

showtimesController.getAddPage = async (req, res, next) => {
	const allMovies = await Movie.find({});
	const allCinemas = await Cinema.find({});
	res.render('addShowtimes', {
		action: "Thêm suất chiếu", 
		allMovies, allCinemas
    })
};

showtimesController.addShowtime = (req, res, next) => {
	const info = {
		movie: req.body.movie,
		cinema: req.body.cinema,
		time: req.body.datetime
	}
	const showtime = new Showtime();
	showtime.newShowtime(info, (err) => {
		if (err) {
			if (err == "Invalid Time") {
				res.send("Thời gian không hợp lệ");
			} else {
				console.log(err);
				res.send("An error occurred");
			}
		} else res.redirect('/showtimes');
	})
}

showtimesController.removeShowtime = (req, res, next) => {
	const id = req.params.id;
	const showtime = new Showtime();
	showtime.removeShowtime(id, (err) => {
		if (err) {
			console.log(err);
			res.send("An error occurred");
		} else res.redirect('/showtimes');
	})
}


module.exports = showtimesController;