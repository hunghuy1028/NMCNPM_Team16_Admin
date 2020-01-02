const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Sale = new Schema({
    Name: {
        type: String,
        require: true,
    },
    Description: {
        type: String,
    },
    Discount: {
        type: Number
    },
    DueDate: {
        type: Date
    }
})

module.exports = mongoose.model('Sales', Sale);