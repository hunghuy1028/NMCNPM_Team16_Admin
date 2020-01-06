var express = require('express');
var router = express.Router();
const report = require('../controller/reports');

router.get('/month', isLoggedIn, report.monthReport);

router.get('/getmonthdata', isLoggedIn, report.getMonthReportData);

module.exports = router;

function isLoggedIn(req, res, next) {
	next();
	// if(req.isAuthenticated())
	// 	return next();
	// res.redirect('/');
}