const user = require("../models/user");
const bcrypt = require("bcryptjs");

class AuthController {
    constructor() {}

    signUp = async (req, res) => {
        try {
            const { email, phone, fullname, password } = req.body;
            let encryptedPassword = password;
            if (password) {
                encryptedPassword = await bcrypt.hash(password, 10);
            } else {
                res.status(400).json({ message: "password can not be empty" });
            }

            const newUser = await new user({
                email: email,
                phone: phone,
                fullname: fullname.toUpperCase(),
                password: encryptedPassword,
            });

            await newUser.save();
            res.status(201).json({
                message: "Success add user to database",
                data: newUser,
            });
        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    };

    signIn = async (req, res) => {
        try {
            const { email, password } = req.body;
            const userFound = await user.findOne({
                email: email,
            });

            if (userFound) {
                if (await bcrypt.compare(password, userFound.password)) {
                    res.status(200).json({
                        message: "Login success",
                        data: userFound,
                    });
                } else {
                    res.status(400).json({ message: "Wrong password" });
                }
            } else {
                res.status(400).json({ message: "User not found" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
}
module.exports = { AuthController };
