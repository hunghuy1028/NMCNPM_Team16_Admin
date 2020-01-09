const Movie = require('../models/movies');
const Showtime = require('../models/showtimes');

const movieController = {};

movieController.index = async (req, res, next) => {
	const movies = await Movie.find({});
	var allmovies = [];
	var comingsoonmovies = [];

	await movies.forEach((movie) => {
		if(movie.Comingsoon == true) {
			comingsoonmovies.push(movie);
		}
		else {
			allmovies.push(movie);
		}
	});


	res.render('quan_ly_phim', { 
		action: "Danh sách phim", 
		allmovies, comingsoonmovies
	});
};

movieController.getupdatePage= async (req, res, next) => {
	const movie = await Movie.findById(req.query.id);
	res.render('updatemovie', { 
		action: "Chỉnh sửa phim", 
		movie
	});
};

movieController.update = async (req, res, next) => {
	const newmovie = {
		Id: req.query.id,
		Name: req.param('name'),
		Length: req.param('length'),
		Director: req.param('director'),
		Category: req.param('category'),
		Trailer: req.param('trailer'),
		Year: req.param('year'),
		Description: req.param('description')
	};

	const movie = await Movie.findById(newmovie.Id);
	movie.Name = newmovie.Name;
	movie.Length = newmovie.Length;
	movie.Director = newmovie.Director;
	movie.Category = newmovie.Category;
	movie.Trailer = newmovie.Trailer;
	movie.Year = newmovie.Year;
	movie.Description = newmovie.Description;
	await movie.save();

	res.redirect('/movie');
};

movieController.getaddPage = async (req, res, next) => {
	res.render('addmovie', { 
		action: "Thêm phim đang chiếu", 
	});
};

movieController.add = async (req, res, next) => {
	const movie = {
		Name: req.param('name'),
		Length: req.param('length'),
		Director: req.param('director'),
		Category: req.param('category'),
		Trailer: req.param('trailer'),
		Year: req.param('year'),
		Description: req.param('description'),
		Comingsoon: false
	};
	const newMovie = new Movie();
	newMovie.newMovie(movie, (err) => {
		if (err) {
			console.log(err);
			res.send("An error occurred");
		} else res.redirect('/movie');
	});
};

movieController.getaddComingSoonPage = async (req, res, next) => {
	res.render('addcomingsoonmovie', { 
		action: "Thêm phim đang chiếu", 
	});
};

movieController.addComingSoon = async (req, res, next) => {
	const movie = {
		Name: req.param('name'),
		Length: req.param('length'),
		Director: req.param('director'),
		Category: req.param('category'),
		Trailer: req.param('trailer'),
		Year: req.param('year'),
		Description: req.param('description'),
		Comingsoon: true
	};
	const newMovie = new Movie();
	newMovie.newMovie(movie, (err) => {
		if (err) {
			console.log(err);
			res.send("An error occurred");
		} else res.redirect('/movie');
	});
};

movieController.remove = async (req, res, next) => {
	const id = req.params.id;
	const allShowtimes = await Showtime.find({});
	const Delshowtime = new Showtime();

	allShowtimes.foeEach(async (showtime) => {
		if(showtime.MovieID == id) {
			await Delshowtime.removeOne(id, (err => {
				if (err) {
					console.log(err);
					res.send("An error occurred");
				}
			}));
		}
	});

	const movie = new Movie();
	movie.removeOne(id, (err) => {
		if (err) {
			console.log(err);
			res.send("An error occurred");
		} else res.redirect('/movie');
	});
}

module.exports = movieController;