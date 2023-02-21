const help = require("../models/help");

class HelpController {
    constructor() {}
    // asynchronous addHelp functon
    addHelp = async (req, res) => {
        try {
            // get title and answer value from client
            const { title, answer } = req.body;
            if (title !== "" && title !== null && title !== undefined) {
                if (answer !== "" && answer !== null && answer !== undefined) {
                    // create new help data
                    const newData = await new help.model({
                        title: title,
                        answer: answer,
                    });
                    // save new help data to mongodb
                    await newData.save();
                    // send response to user that new data is saved to mongodb
                    res.status(201).json({
                        message: "new help data added to database",
                        data: newData,
                    });
                } else {
                    // send response answer empty
                    res.status(200).json({
                        message: "answer can not be empty",
                    });
                }
            } else {
                // send response title empty
                res.status(200).json({ message: "title can not be empty" });
            }
        } catch (error) {
            // send response if any error occured
            res.status(500).json({ message: error });
        }
    };
    // asynchronous getHelp function
    getHelp = async (req, res) => {
        try {
            // find all help data from mongodb
            const data = await help.model.find();
            if (data.length > 0) {
                // send all found data to client
                res.status(200).json({ data: data, message: "data found" });
            } else {
                // send mesage data not found
                res.status(404).json({ message: "data not found" });
            }
        } catch (error) {
            // send response if any error occured
            res.status(500).json({ message: error });
        }
    };
}

module.exports = { HelpController };
