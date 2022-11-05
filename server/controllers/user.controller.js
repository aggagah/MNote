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

const updateUser = (req, res) => {
    const {email, fullname} = req.body

    user.findOneAndUpdate({
        fullname: fullname
    }, {
        email: email
    }, {
        returnOriginal: false
    }, (err, result) => {
        if(err){
            console.error(err)
        } else {
            res.json({message: "succes update data", data: result})
        }
    })
}

module.exports = { getUser, updateUser };
