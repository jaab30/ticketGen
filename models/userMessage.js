const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserMessageSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },

    subject: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isMessageNew: {
        type: Boolean,
        default: true
    }

});

module.exports = UserMessage = mongoose.model("usermessage", UserMessageSchema);