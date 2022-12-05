const help = require("../models/help");

class HelpController {
    constructor() {}

    addHelp = async (req, res) => {
        try {
            const { title, answer } = req.body;

            const newData = await new help({
                title: title,
                answer: answer,
            });

            newData.save();
            res.status(201).json({
                message: "new help data added to database",
            });
        } catch (error) {
            console.error(error.message);
        }
    };

    getHelp = async (req, res) => {
        const data = await help.find();

        res.status(200).json(data);
    };
}

module.exports = { HelpController };
