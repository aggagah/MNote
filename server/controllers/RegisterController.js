const user = require("../models/user");
const bcrypt = require("bcryptjs");

class Register {
    // asynchronous signUp function
    signUp = async (req, res) => {
        try {
            // get email, phone, fullname, and password value from client
            const { email, phone, fullname, password } = req.body;
            // check email is valid
            if (email !== "" && email !== null && email !== undefined) {
                // check phone is valid
                if (phone !== "" && phone !== null && phone !== undefined) {
                    // check fullname is valid
                    if (
                        fullname !== "" &&
                        fullname !== null &&
                        fullname !== undefined
                    ) {
                        // check password is valid
                        if (
                            password !== "" &&
                            password !== null &&
                            password !== undefined
                        ) {
                            // create encrypted password
                            let encryptedPassword = password;
                            // encrypt password with hash from bcrypjt
                            encryptedPassword = await bcrypt.hash(password, 10);
                            // create new user data with given values
                            const newUser = await new user({
                                email: email,
                                phone: phone,
                                fullname: fullname.toUpperCase(),
                                password: encryptedPassword,
                            });

                            // save new user data to mongodb
                            await newUser.save();
                            // send response to client that new user data is created
                            res.status(201).json({
                                message: "Success add user to database",
                                data: newUser,
                            });
                        } else {
                            // send response to client that password is empty
                            res.status(200).json({
                                message: "password can not be empty",
                            });
                        }
                    } else {
                        // send response fullname empty
                        res.status(200).json({
                            message: "fullname can not be empty",
                        });
                    }
                } else {
                    // send response phone empty
                    res.status(200).json({ message: "phone can not be empty" });
                }
            } else {
                // send response email empty
                res.status(200).json({ message: "email can not be empty" });
            }
        } catch (error) {
            // error duplicate email
            if (String(error.message).includes("index: email_1 dup key")) {
                res.status(200).json({
                    message: "duplicate email",
                });
            } else if (
                // error duplicate phone
                String(error.message).includes("index: phone_1 dup key")
            ) {
                res.status(200).json({
                    message: "duplicate phone",
                });
            } else {
                // if any error, send response to client
                res.status(500).json({
                    message: error,
                });
            }
        }
    };
}

module.exports = { Register };
