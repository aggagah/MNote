const user = require("../models/user");
const bcrypt = require("bcryptjs");

class UserController {
    constructor() {}

    getUser = async (req, res) => {
        // find all user data in mongodb
        const userData = await user.model.find();

        // if data exists
        if (userData.length > 0) {
            // send data to client
            res.status(200).json({ data: userData });
        } else {
            // if not exists, send error message
            res.status(404).json({ message: "data not found" });
        }
    };
    // asynchronous getUserByName function
    getUserById = async (req, res) => {
        try {
            // get fullname value from client
            const { _id } = req.body;
            if (_id !== "" && _id !== null && _id !== undefined) {
                // find a user data from mongodb with given id
                const userData = await user.model.findOne({
                    _id: _id,
                });
                if (userData) {
                    // if found, send it back to client
                    res.status(200).json(userData);
                } else {
                    // if not found, give error message
                    res.status(404).json({ message: "user not found" });
                }
            } else {
                // send response invalid user id
                res.status(200).json({ message: "invalid user id" });
            }
        } catch (error) {
            // send response if any error occured
            res.status(500).json({ message: error });
        }
    };
    // asynchronous updateUser function
    updateUser = async (req, res) => {
        try {
            // get _id, fullname, email, phone, password value from client
            const { _id, fullname, email, phone, password } = req.body;
            // check invalid _id
            if (_id !== undefined && _id !== "" && _id !== "") {
                // check invalid fullname
                if (
                    fullname != undefined &&
                    fullname !== null &&
                    fullname !== ""
                ) {
                    // check invalid email
                    if (email !== undefined && email !== null && email !== "") {
                        // check invalid phone
                        if (
                            phone !== undefined &&
                            phone !== null &&
                            phone !== ""
                        ) {
                            // check invalid password
                            if (
                                password !== undefined &&
                                password !== null &&
                                password !== ""
                            ) {
                                // check password length (to check if user input new password)
                                if (password.length < 30) {
                                    await user.model
                                        .findOneAndUpdate(
                                            { _id: _id },
                                            {
                                                fullname:
                                                    fullname.toUpperCase(),
                                                email: email,
                                                phone: phone,
                                                password: await bcrypt.hash(
                                                    password,
                                                    10
                                                ),
                                            },
                                            {
                                                returnOriginal: false,
                                            }
                                        )
                                        .then((response) => {
                                            res.status(201).json(response);
                                        });
                                } else {
                                    // user use old password (no new password)
                                    await user.model
                                        .findOneAndUpdate(
                                            { _id: _id },
                                            {
                                                fullname:
                                                    fullname.toUpperCase(),
                                                email: email,
                                                phone: phone,
                                            },
                                            {
                                                returnOriginal: false,
                                            }
                                        )
                                        .then((response) => {
                                            res.status(201).json(response);
                                        });
                                }
                            } else {
                                // send response passwor empty
                                res.status(200).json({
                                    message: "password empty",
                                });
                            }
                        } else {
                            // send response phone empty
                            res.status(200).json({ message: "phone empty" });
                        }
                    } else {
                        // send response email empty
                        res.status(200).json({ message: "email empty" });
                    }
                } else {
                    // send resopnse fullname empty
                    res.status(200).json({ message: "fullname empty" });
                }
            } else {
                // send response invalid id
                res.status(200).json({
                    message: "invalid id",
                });
            }
        } catch (error) {
            // error id type
            if (String(error).includes("CastError: Cast to ObjectId failed")) {
                res.status(200).json({
                    message: "invalid id (must be ObjectId, not string)",
                });
            } else {
                // send response if any error occured
                res.status(500).json({ message: error });
            }
        }
    };
}
module.exports = { UserController };
