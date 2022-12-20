const help = require("../models/help");

class HelpController {
    constructor() {}
    // asynchronous addHelp functon
    addHelp = async (req, res) => {
        try {
            // get title and answer value from client
            const { title, answer } = req.body;
            // create new help data
            const newData = await new help({
                title: title,
                answer: answer,
            });
            // save new help data to mongodb
            newData.save();
            // send response to user that new data is saved to mongodb
            res.status(201).json({
                message: "new help data added to database",
            });
        } catch (error) {
            // if any error, console it to backend terminal
            console.error(error.message);
        }
    };
    // asynchronous getHelp function
    getHelp = async (req, res) => {
        // find all help data from mongodb
        const data = await help.find();
        // send all found data to client
        res.status(200).json(data);
    };
}

module.exports = { HelpController };
