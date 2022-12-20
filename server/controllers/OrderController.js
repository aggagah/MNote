const order = require("../models/order");
const user = require("../models/user");

class OrderController {
    constructor() {}
    // retrieve all order data from the user
    getAllOrder = async (req, res) => {
        try {
            // get _id value from the client (user id)
            const { _id } = req.body;
            // find the data with current date
            const orderData = await user.findOne({ _id: _id }).populate({
                path: "orders",
                match: {
                    date: `${
                        new Date().getDate() < 10
                            ? "0" + new Date().getDate()
                            : new Date().getDate()
                    }-${new Date().getMonth() + 1}-${new Date().getFullYear()}`,
                },
            });
            // check if data found
            if (orderData) {
                // send data to client if exists
                res.status(200).json({ data: orderData });
            } else {
                // send null data to client
                res.status(404).json({ data: null });
            }
        } catch (error) {
            // if any error, set status code to 500
            res.status(500).json({ message: error });
        }
    };

    // get order data based on name
    getOrderByName = async (req, res) => {
        try {
            // get name value from client
            const { name, _id } = req.body;
            // find the user then populate the user's order data with custom match
            // find orders data with specific name
            const orderData = await user
                .findOne({ _id: _id })
                .populate({ path: "orders", match: { name: name } });
            // check if data exists
            if (orderData) {
                // send data to client if exists
                res.status(200).json({
                    message: "data found",
                    data: orderData,
                });
            } else {
                // set status code to 404 if not exists
                res.status(404).json({ message: "data not found" });
            }
        } catch (error) {
            // set status code to 500 if any error
            res.status(500).json({ message: error });
        }
    };

    // get order data based on date
    getOrderByDate = async (req, res) => {
        try {
            // get date and _id value from client
            const { date, _id } = req.body;
            // find the user then populate user's order data with custom match (date)
            const orderData = await user.findOne({ _id: _id }).populate({
                path: "orders",
                match: { date: date },
            });
            // check if data exists
            if (orderData) {
                // send to client
                res.status(200).json(orderData);
            } else {
                // set status code to 404 if no data
                res.status(404).json({ message: "data not found" });
            }
        } catch (error) {
            // set status code to 500 if any error
            res.status(500).json({ message: error });
        }
    };

    // add new order data
    addOrder = async (req, res) => {
        // get name and amount value from client
        const { name, amount, _id } = req.body;
        // find the user
        const userData = await user.findOne({
            _id: _id,
        });

        if (userData) {
            // create totalPrice variable
            let totalPrice;
            switch (name) {
                case "nasi goreng":
                    // assign totalPrice with 13k if item name is nasi goreng
                    totalPrice = 13000;
                    break;
                case "tahu campur":
                    // assign totalPrice with 10k if item name is tahu campur
                    totalPrice = 10000;
                    break;
                case "pecel ayam":
                    // assign totalPrice with 17k if item name is pecel ayam
                    totalPrice = 17000;
                    break;
                default:
                    break;
            }
            // create new order data with given name, amount, and totalPrice value
            const newOrder = await new order({
                name: name,
                amount: amount,
                date: `${
                    new Date().getDate() < 10
                        ? "0" + new Date().getDate()
                        : new Date().getDate()
                }-${new Date().getMonth() + 1}-${new Date().getFullYear()}`,
                totalPrice: totalPrice * amount,
                user: userData._id,
            });
            // save new order data to mongodb
            await newOrder.save((err, order) => {
                user.findByIdAndUpdate(
                    userData._id,
                    // update or add the data to user's order data
                    { $push: { orders: order._id } },
                    (error, userr) => {
                        console.log(
                            "order data has been added to user's orders array"
                        );
                    }
                );
            });
            // send new order data to client
            res.status(201).json({
                message: "Success add order data",
                data: newOrder,
            });
        }
    };

    // delete order data
    deleteOrder = async (req, res) => {
        // get id of order data from client
        const { _id } = req.body;
        // console it just to ensure it's not null
        console.log(_id);
        // find order data with given id
        await order
            .findOneAndDelete({
                _id: _id,
            })
            .then((result) => {
                // if found, console it and send response to client
                console.log(result);
                res.status(200).json(result);
            });
    };
}
module.exports = {
    OrderController,
};
