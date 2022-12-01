const user = require("../models/user");
const bcrypt = require("bcryptjs");

class UserController {
    constructor() {}

    getUser = (req, res) => {
        user.find({}, (err, result) => {
            if (err) {
                console.error(err);
            } else {
                res.status(200).json(result);
            }
        });
    };

    getUserByName = async (req, res) => {
        const { fullname } = req.body;
        await user
            .findOne({
                fullname: fullname,
            })
            .then((response) => {
                res.status(200).json(response);
            });
    };

    updateUser = async (req, res) => {
        const { _id, fullname, email, phone, password } = req.body;
        console.log(password);
        await user
            .findOneAndUpdate(
                {
                    _id: _id,
                },
                {
                    fullname: fullname.toUpperCase(),
                    email: email,
                    phone: phone,
                    password:
                        password.length < 30
                            ? await bcrypt.hash(password, 10)
                            : password,
                },
                {
                    returnOriginal: false,
                }
            )
            .then((response) => {
                res.status(201).json(response);
            });
    };
}
module.exports = { UserController };
