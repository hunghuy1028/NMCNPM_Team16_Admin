const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SaleSchema = new Schema({
    Name: {
        type: String,
        require: true,
    },
    Condition: {
        type: String,
    },
    Description: {
        type: String,
    },
    Discount: {
        type: Number,
    },
    DueDate: {
        type: Date
    }
});

SaleSchema.methods.newSale = function(info, next) {
    (this).model('Sale').create({
        Name: info.name,
        Condition: info.condition,
        Description: info.description,
        Discount: info.discount,
        DueDate: info.date
    }, (err, res) => {
        if (err) {
            console.log(err);
            return next(err);
        } else return next(null);
    })
};

SaleSchema.methods.removeOne = function(id, next) {
    (this).model('Sale').deleteOne({
        _id: id
    }, (err) => {
        if (err) {
            return next(err);
        } else return next(null);
    })
};

const Sale = mongoose.model('Sale', SaleSchema);

module.exports = Sale;