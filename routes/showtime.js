var express = require('express');
var router = express.Router();
const showtime = require('../controller/showtimes');

router.get('/', isLoggedIn, showtime.index);

router.get('/add', isLoggedIn, showtime.getAddPage);

router.post('/add', isLoggedIn, showtime.addShowtime);

router.get('/remove/:id', isLoggedIn, showtime.removeShowtime);

module.exports = router;

function isLoggedIn(req, res, next) {
	next();
	// if(req.isAuthenticated())
	// 	return next();
	// res.redirect('/');
}