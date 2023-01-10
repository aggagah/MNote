const mongoose = require("mongoose");

class Order {
    constructor() {
        this.schema = new mongoose.Schema({
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
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
            },
        });

        this.model = mongoose.model("order", this.schema);
    }
}

module.exports = new Order();
