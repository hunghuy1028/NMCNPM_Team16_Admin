const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Ticket = new Schema({
    StaffID: {
        type: ObjectId,
        require: true,
        ref: 'Staffs'
    },
    TicketID: {
        type: ObjectId,
        require: true,
        ref: 'TicketDetails'
    },
    Cost: {
        type: Number,
        require: true
    }
})

module.exports = mongoose.model('Tickets', Ticket);