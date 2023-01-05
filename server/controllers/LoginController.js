const user = require("../models/user");
const bcrypt = require("bcryptjs");

class Login {
    // asynchronous signIn function
    signIn = async (req, res) => {
        try {
            // get email and password value from client
            const { email, password } = req.body;
            // check if input is valid (not empty)
            if (email === "" && password === "") {
                res.status(401).json({
                    message: "empty data",
                });
            } else {
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
            }
        } catch (error) {
            // if any error, send response to inform client about the error
            res.status(500).json({ message: error.message });
        }
    };
}

module.exports = { Login };
