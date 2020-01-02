const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MonthlyStatistic = new Schema({
    Month: {
        type: Date,
        require: true
    },
    Revenue: {
        type: Number,
    }
})

module.exports = mongoose.model('MonthlyStatistics', MonthlyStatistic);