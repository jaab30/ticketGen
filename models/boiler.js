const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BoilerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = Boiler = mongoose.model("boiler", BoilerSchema);