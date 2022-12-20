const user = require("../models/user");
const bcrypt = require("bcryptjs");

class AuthController {
    constructor() {}
    // asynchronous signUp function
    signUp = async (req, res) => {
        try {
            // get email, phone, fullname, and password value from client
            const { email, phone, fullname, password } = req.body;
            // create encrypted password
            let encryptedPassword = password;
            // check if password from client is not null
            if (password) {
                // encrypt password with hash from bcrypjt
                encryptedPassword = await bcrypt.hash(password, 10);
                // check if password is null or empty
            } else {
                // send response to client that password is empty
                res.status(200).json({ message: "password can not be empty" });
            }
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
        } catch (error) {
            // if any error, send response to client
            res.status(400).json({
                message: error.message,
            });
        }
    };

    // asynchronous signIn function
    signIn = async (req, res) => {
        try {
            // get email and password value from client
            const { email, password } = req.body;
            // find user in mongodb with given email
            const userFound = await user.findOne({
                email: email,
            });
            // if user exist in database
            if (userFound) {
                // compare the given password with hashed password in mongodb
                if (await bcrypt.compare(password, userFound.password)) {
                    // if password matched, send response to client that login succes
                    res.status(200).json({
                        message: "Login success",
                        data: userFound,
                    });
                } else {
                    // if password not matched, send response that password is wrong
                    res.status(200).json({ message: "Wrong password" });
                }
            } else {
                // if user not found, send response to client
                res.status(200).json({ message: "User not found" });
            }
        } catch (error) {
            // if any error, send response to inform client about the error
            res.status(500).json({ message: error.message });
        }
    };
}
module.exports = { AuthController };
