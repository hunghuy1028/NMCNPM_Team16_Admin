var express = require('express');
var router = express.Router();
const movie = require('../controller/movies');

router.get('/', isLoggedIn, movie.index);

router.get('/detail', isLoggedIn, movie.getupdatePage);

router.post('/update', isLoggedIn, movie.update);

router.get('/addPage', isLoggedIn, movie.getaddPage);

router.get('/addComingSoonPage', isLoggedIn, movie.getaddComingSoonPage);

router.post('/add', isLoggedIn, movie.add);

router.post('/addComingSoon', isLoggedIn, movie.addComingSoon);

router.get('/remove/:id', isLoggedIn, movie.remove);

module.exports = router;

function isLoggedIn(req, res, next) {
	next();
	// if(req.isAuthenticated())
	// 	return next();
	// res.redirect('/');
}