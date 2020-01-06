var express = require('express');
var router = express.Router();
const staff = require('../controller/staffaccounts');

router.get('/', isLoggedIn, staff.index);

router.get('/detail', isLoggedIn, staff.changepassword);

router.post('/update', isLoggedIn, staff.update);

router.get('/addPage', isLoggedIn, staff.getaddPage);

router.post('/add', isLoggedIn, staff.add);

router.get('/remove/:id', isLoggedIn, staff.remove);

module.exports = router;

function isLoggedIn(req, res, next) {
	next();
	// if(req.isAuthenticated())
	// 	return next();
	// res.redirect('/');
}