const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    key: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("help", Schema);
