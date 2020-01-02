const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Ticket = new Schema({
    StaffID: {
        type: ObjectId,
        require: true,
        ref: 'staffs'
    },
    TicketID: {
        type: ObjectId,
        require: true,
        ref: 'ticketDetails'
    },
    Cost: {
        type: Number,
        require: true
    }
})

module.exports = mongoose.model('tickets', Ticket);