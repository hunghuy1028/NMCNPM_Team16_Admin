var express = require('express');
var router = express.Router();
const report = require('../controller/reports');

router.get('/month', isLoggedIn, report.monthReport);

router.get('/movies', isLoggedIn, report.movieReport);

router.get('/getmonthdata', isLoggedIn, report.getMonthReportData);

router.get('/getmoviesdata', isLoggedIn, report.getMovieReportData);

module.exports = router;

function isLoggedIn(req, res, next) {
	next();
	// if(req.isAuthenticated())
	// 	return next();
	// res.redirect('/');
}