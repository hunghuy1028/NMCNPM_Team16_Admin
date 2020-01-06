const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
    StaffID: {
        type: String,
        require: true,
    },
    ShowtimeID: {
        type: String,
        require: true,
    },
    Position: {
        type: String,
        require: true
    },
    SaleID: {
        type: String,
    },
    Cost: {
        type: Number,
        require: true
    },
})

const Ticket = mongoose.model('Ticket', TicketSchema);

module.exports = Ticket