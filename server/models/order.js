const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("order", Schema);
