const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketDetail = new Schema({
    ShowtimeID: {
        type: ObjectId,
        require: true,
        ref: 'Showtimes'
    },
    Position: {
        type: String,
        require: true
    },
    SaleID: {
        type: ObjectId,
        ref: 'Sales'
    }
})

module.exports = mongoose.model('TicketDetails', TicketDetail);