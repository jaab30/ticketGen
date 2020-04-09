const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserTicketSchema = new Schema({
    tixId: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    comments: {
        type: Array
    },
    images: {
        type: Array
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = UserTicket = mongoose.model("userticket", UserTicketSchema);