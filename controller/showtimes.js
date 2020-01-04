const showtimes = require('../models/showtimes');

const showtimesController = {};

showtimesController.index = async (req, res, next) => {
	res.render('showtimes', { 
		action: "Suất chiếu", 
		user: req.user,
	});
};

showtimesController.getAddPage = (req, res, next) => {
	res.render('addShowtimes', {
        action: "Thêm suất chiếu", 
        user: req.user
    })
};


module.exports = showtimesController;