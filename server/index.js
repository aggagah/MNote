const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// * app configuration
const app = express();
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// * routes
app.get("/", (req, res) => {
    res.send("api base endpoint");
});

// * connect database then run server
const port = process.env.PORT;
const uri = process.env.MONGO_URI;
mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(port, () => {
            console.log("Database connected...");
            console.log(`Server running on port ${port}...`);
        });
    });
