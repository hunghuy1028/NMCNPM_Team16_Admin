const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieStatistic = new Schema({
    MovieID: {
        type: ObjectId,
        require: true
    },
    Revenue: {
        type: Number,
    }
})

module.exports = mongoose.model('MovieStatistics', MovieStatistic);