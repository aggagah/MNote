const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();

// * app configuration
const app = express();
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(morgan("tiny"));

// * session configuration
const MAX_AGE = 1000 * 60 * 30; // 30 minutes
const mongoDBStore = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: "mySessions",
});

app.use(
    session({
        secret: process.env.SECRET,
        name: "session-id",
        store: mongoDBStore,
        cookie: {
            maxAge: MAX_AGE,
            sameSite: false,
            secure: false,
        },
        resave: true,
        saveUninitialized: false,
    })
);

// * default routes
app.get("/", (req, res) => {
    res.send("api base endpoint");
});

// * user routes
app.use("/user", require("./routes/user.route"));

// * auth routes
app.use("/auth", require("./routes/auth.route"));

// * order routes
app.use("/order", require("./routes/order.route"));

// * help routes
app.use("/help", require("./routes/help.route"));

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
