const sales = require('../models/sales');

const salesController = {};

salesController.index = async (req, res, next) => {
	const allSales = await sales.find({});
	res.render('sales', { 
		action: "Ưu đãi", 
		user: req.user,
		allSales
	});
};

salesController.getAddPage = (req, res, next) => {
    res.render('addSales', {
        action: "Thêm ưu đãi", 
        user: req.user
    })
};


module.exports = salesController;