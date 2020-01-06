var express = require('express');
var router = express.Router();
const sales = require('../controller/sales');

router.get('/', isLoggedIn, sales.index);

router.get('/add', isLoggedIn, sales.getAddPage);

router.post('/add', isLoggedIn, sales.addSale);

router.get('/remove/:id', isLoggedIn, sales.removeSale);

module.exports = router;

function isLoggedIn(req, res, next) {
	next();
	// if(req.isAuthenticated())
	// 	return next();
	// res.redirect('/');
}