const mongoose = require("mongoose");

class User {
    constructor() {
        this.schema = new mongoose.Schema({
            email: {
                type: String,
                required: true,
                unique: true,
            },
            phone: {
                type: String,
                required: true,
                unique: true,
            },
            fullname: {
                type: String,
                required: true,
            },
            password: {
                type: String,
                required: true,
            },
            orders: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "order",
                },
            ],
        });

        this.model = mongoose.model("user", this.schema);
    }
}

module.exports = new User();
