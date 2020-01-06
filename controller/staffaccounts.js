const bcrypt = require('bcrypt-nodejs');
const Staff = require('../models/staffs');

const staffaccountController = {};

staffaccountController.index = async (req, res, next) => {
	const allaccounts = await Staff.find({});
	res.render('quan_ly_account', { 
		action: "Danh sách nhân viên", 
		allaccounts
	});
};

staffaccountController.changepassword = async (req, res, next) => {
	const account = await Staff.findById(req.query.id);
	res.render('updateaccount', { 
		action: "Chỉnh sửa mật khẩu", 
		account
	});
};

staffaccountController.update = async (req, res, next) => {
	const staff = {
		Id: req.query.id,
		Name: req.param('name'),
		Gender: req.param('gender'),
		Phone: req.param('phone'),
		Username: req.param('username'),
		newPassword: req.param('newpassword')
	};

	const account = await Staff.findById(staff.Id);
	account.Name = staff.Name;
	account.Gender = staff.Gender == "Nữ" ? true : false;
	account.Phone = staff.Phone;

	if(staff.newPassword !== "") {
		account.Password = bcrypt.hashSync(staff.newPassword, null, null);
	}
	await account.save();

	res.redirect('/staff');
};

staffaccountController.getaddPage = async (req, res, next) => {
	res.render('addaccount', { 
		action: "Thêm tài khoản nhân viên", 
	});
};

staffaccountController.add = async (req, res, next) => {
	const account = {
		Name: req.param('name'),
		Gender: req.param('gender'),
		Phone: req.param('phone'),
		Username: req.param('username'),
		Password: req.param('password')
	};
	const newAccount = new Staff();
	newAccount.newAccount(account, (err) => {
		if (err) {
			console.log(err);
			res.send("An error occurred");
		} else res.redirect('/staff');
	});
};

staffaccountController.remove = (req, res, next) => {
	const id = req.params.id;
	const account = new Staff();
	account.removeOne(id, (err) => {
		if (err) {
			console.log(err);
			res.send("An error occurred");
		} else res.redirect('/staff');
	});
}

module.exports = staffaccountController;