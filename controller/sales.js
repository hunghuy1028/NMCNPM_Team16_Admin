const Sale = require('../models/sales');

const salesController = {};

salesController.index = async (req, res, next) => {
	const allSales = await Sale.find({});
	res.render('sales', { 
		action: "Ưu đãi", 
		allSales
	});
};

salesController.getAddPage = (req, res, next) => {
    res.render('addSales', {
        action: "Thêm ưu đãi", 
    });
};

salesController.addSale = (req, res, next) => {
	let DueDate = '';
	if (req.body.date) {
		DueDate = new Date(req.body.date);
	}
	const info = {
		name: req.body.name,
		condition: req.body.condition,
		description: req.body.description,
		discount: req.body.discount,
		date: DueDate
	}
	const newSale = new Sale();
	newSale.newSale(info, (err) => {
		if (err) {
			console.log(err);
			res.send("An error occurred");
		} else res.redirect('/sales/');
	});
}

salesController.removeSale = (req, res, next) => {
	const id = req.params.id;
	const sale = new Sale();
	sale.removeOne(id, (err) => {
		if (err) {
			console.log(err);
			res.send("An error occurred");
		} else res.redirect('/sales/');
	});
}

module.exports = salesController;