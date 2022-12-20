const user = require("../models/user");
const bcrypt = require("bcryptjs");

class UserController {
    constructor() {}

    getUser = (req, res) => {
        // find all user data in mongodb
        user.find({}, (err, result) => {
            if (err) {
                // if any error, console it in backend terminal
                console.error(err);
            } else {
                // if no error, send data to client
                res.status(200).json(result);
            }
        });
    };
    // asynchronous getUserByName function
    getUserById = async (req, res) => {
        // get fullname value from client
        const { _id } = req.body;
        // finc a user data from mongodb with given fullname
        await user
            .findOne({
                _id: _id,
            })
            .then((response) => {
                // if found, send it back to client
                res.status(200).json(response);
            });
    };
    // asynchronous updateUser function
    updateUser = async (req, res) => {
        // get _id, fullname, email, phone, password value from client
        const { _id, fullname, email, phone, password } = req.body;
        // console password to ensure its value is not null or empty
        console.log(password);
        // find a user data with given _id
        await user
            .findOneAndUpdate(
                {
                    _id: _id,
                },
                // if found, then update the data with given values
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
                // if update proces succes, send response to client
                res.status(201).json(response);
            });
    };
}
module.exports = { UserController };
