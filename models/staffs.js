const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const Staff = new Schema({
    Name: {
        type: String
    },
    Gender: {
        type: Boolean
    },
    Phone: {
        type: String
    },
    Username: {
        type: String,
        require: true,
        unique: true
    },
    Password: {
        type: String,
        require: true
    }
});

Staff.methods.newAccount = function(account, next) {
    (this).model('staffs').create({
        Name: account.Name,
        Gender: account.Gender == "Nữ" ? true : false,
        Phone: account.Phone,
        Username: account.Username,
        Password: bcrypt.hashSync(account.Password, null, null)
    }, (err, res) => {
        if (err) {
            console.log(err);
            return next(err);
        } else return next(null);
    })
};

Staff.methods.removeOne = function(id, next) {
    (this).model('staffs').deleteOne({
        _id: id
    }, (err) => {
        if (err) {
            return next(err);
        } else return next(null);
    })
};


module.exports = mongoose.model('staffs', Staff);