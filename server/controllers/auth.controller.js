const user = require("../models/user");
const bcrypt = require("bcryptjs");

const signUp = async (req, res) => {
    try {
        const { email, phone, fullname, password } = req.body;
        let encryptedPassword = password;
        if (password) {
            encryptedPassword = await bcrypt.hash(password, 10);
        } else {
            res.json({ message: "password can not be empty" });
        }

        const newUser = await new user({
            email: email,
            phone: phone,
            fullname: fullname.toUpperCase(),
            password: encryptedPassword,
        });

        await newUser.save();
        res.json({
            message: "Success add user to database",
            data: newUser,
        });
    } catch (error) {
        res.json({
            message: error.message,
        });
    }
};

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userFound = await user.findOne({
            email: email,
        });

        if (userFound) {
            if (await bcrypt.compare(password, userFound.password)) {
                const userSession = { email: userFound.email };
                req.session.user = userSession;
                req.session.isAuth = true;
                res.json({ message: "Login success", data: userFound });
            } else {
                res.json({ message: "Wrong password" });
            }
        } else {
            res.json({ message: "User not found" });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
};

module.exports = {
    signUp,
    signIn,
};
