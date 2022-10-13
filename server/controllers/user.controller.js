const user = require("../models/user");

const getUser = (req, res) => {
    user.find({}, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            res.json(result);
        }
    });
};

module.exports = { getUser };
