var express = require('express');
var router = express.Router();

const sales = require('../models/sales');

router.get('/', isLoggedIn, async (req, res, next) => {
	const allSales = await sales.find({});
	res.render('sales', { 
		action: "Ưu đãi", 
		user: req.user ,
		allSales
	});
});

module.exports = router;

function isLoggedIn(req, res, next) {
	next();
	// if(req.isAuthenticated())
	// 	return next();
	// res.redirect('/');
}