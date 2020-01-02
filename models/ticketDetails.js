const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketDetail = new Schema({
    ShowtimeID: {
        type: ObjectId,
        require: true,
        ref: 'showtimes'
    },
    Position: {
        type: String,
        require: true
    },
    SaleID: {
        type: ObjectId,
        ref: 'sales'
    }
})

module.exports = mongoose.model('ticketdetails', TicketDetail);