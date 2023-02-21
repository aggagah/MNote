const mongoose = require("mongoose");
class Help {
    constructor() {
        this.schema = new mongoose.Schema({
            title: {
                type: String,
                required: true,
            },
            answer: {
                type: String,
                required: true,
            },
        });
        this.model = mongoose.model("help", this.schema);
    }
}

module.exports = new Help();
