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
                    }-${
                        new Date().getMonth() < 10
                            ? "0" + (new Date().getMonth() + 1)
                            : new Date().getMonth() + 1
                    }-${new Date().getFullYear()}`,
                },
            });
            // check if data found
            if (orderData) {
                // send data to client if exists
                res.status(200).json({ data: orderData });
            } else {
                // send null data to client
                res.status(404).json({ message: "data not found" });
            }
        } catch (error) {
            // if user id invalid / cannot converted to objId
            if (String(error).includes("CastError: Cast to ObjectId")) {
                res.status(200).json({ message: "invalid user id" });
            } else {
                // if any error, set status code to 500
                res.status(500).json({ message: error });
            }
        }
    };

    // get order data based on name
    getOrderByName = async (req, res) => {
        try {
            // get name value from client
            const { name, _id } = req.body;
            // find the user then populate the user's order data with custom match
            // find orders data with specific name
            if (_id !== "" && _id !== null && _id !== undefined) {
                if (name !== "" && name !== null && name !== undefined) {
                    const userData = await user.findOne({ _id: _id });
                    // check if user data exists
                    if (userData) {
                        // if user exists, populate the orders list with given name
                        const result = await userData.populate({
                            path: "orders",
                            match: { name: name },
                        });
                        // if orders list not empty (has order with given name)
                        if (result.orders.length !== 0) {
                            // send data to client if exists
                            res.status(200).json({
                                message: "data found",
                                data: result,
                            });
                        } else {
                            // send message that no order data with given name
                            res.status(404).json({
                                message: "order data not found",
                            });
                        }
                    } else {
                        // set status code to 404 if user not exists
                        res.status(404).json({ message: "user not found" });
                    }
                } else {
                    res.status(200).json({
                        message: "invalid name",
                    });
                }
            } else {
                res.status(200).json({
                    message: "invalid user id",
                });
            }
        } catch (error) {
            if (String(error).includes("CastError: Cast to ObjectId failed")) {
                res.status(200).json({
                    message: "invalid user id (must be ObjectId, not string)",
                });
            } else {
                // set status code to 500 if any error
                res.status(500).json({ message: error });
            }
        }
    };

    // get order data based on date
    getOrderByDate = async (req, res) => {
        try {
            // get date and _id value from client
            const { date, _id } = req.body;
            if (_id !== "" && _id !== null && _id !== undefined) {
                if (date !== "" && date !== null && date !== undefined) {
                    // find the user
                    const userData = await user.findOne({ _id: _id });

                    // check if user data exists
                    if (userData) {
                        // populate the orders list
                        const orderData = await userData.populate({
                            path: "orders",
                            match: { date: date },
                        });

                        if (orderData.orders.length !== 0) {
                            res.status(200).json({
                                data: orderData,
                                message: "data found",
                            });
                        } else {
                            res.status(404).json({ message: "data not found" });
                        }

                        // send to client
                    } else {
                        // set status code to 404 if no data
                        res.status(404).json({ message: "user not found" });
                    }
                } else {
                    res.status(200).json({
                        message: "invalid date",
                    });
                }
            } else {
                res.status(200).json({
                    message: "invalid user id",
                });
            }
        } catch (error) {
            if (String(error).includes("CastError: Cast to ObjectId failed")) {
                res.status(200).json({
                    message: "invalid user id (must be ObjectId, not string)",
                });
            } else {
                // set status code to 500 if any error
                res.status(500).json({ message: error });
            }
        }
    };

    // add new order data
    _addOrder = async (req, res) => {
        try {
            // get name, _id, and amount value from client
            const { name, amount, _id } = req.body;
            // check name empty
            if (name !== "" && name !== null && name !== undefined) {
                // check amount empty
                if (amount !== "" && amount !== null && amount !== undefined) {
                    // check _id empty
                    if (_id !== "" && _id !== null && _id != undefined) {
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
                                }-${
                                    new Date().getMonth() < 10
                                        ? "0" + (new Date().getMonth() + 1)
                                        : new Date().getMonth() + 1
                                }-${new Date().getFullYear()}`,
                                totalPrice: totalPrice * amount,
                                user: userData._id,
                            });
                            // save new order data to mongodb
                            await newOrder.save();
                            // update or add the data to user's order data
                            const updatedUserData =
                                await user.findByIdAndUpdate(userData._id, {
                                    $push: { orders: newOrder._id },
                                });
                            // send new order data to client
                            res.status(201).json({
                                message: "Success add order data",
                                data: updatedUserData,
                            });
                        } else {
                            // send resopnse user not found
                            res.status(200).json({
                                message: "user not found",
                            });
                        }
                    } else {
                        // send response empty id
                        res.status(200).json({
                            message: "user id can not be empty",
                        });
                    }
                } else {
                    // send response amount empty
                    res.status(200).json({
                        message: "amount can not be empty",
                    });
                }
            } else {
                // send response name empty
                res.status(200).json({ message: "name can not be empty" });
            }
        } catch (error) {
            // send response if any error occured
            res.status(500).json({ message: error });
        }
    };
    get addOrder() {
        return this._addOrder;
    }
    set addOrder(value) {
        this._addOrder = value;
    }

    // delete order data
    deleteOrder = async (req, res) => {
        try {
            // get id of order data from client
            const { _id } = req.body;
            // check invalid id
            if (_id !== "" && _id !== null && _id !== undefined) {
                // find order data with given id
                const orderData = await order.findOneAndDelete({
                    _id: _id,
                });
                if (orderData) {
                    // if succes, update the user data and send message data deleted
                    await user
                        .updateOne({ $pull: { orders: _id } })
                        .then(() => {
                            res.status(200).json({ message: "data deleted" });
                        });
                } else {
                    // if data not found with given id, send message data not found
                    res.status(404).json({ message: "data not found" });
                }
            } else {
                // order id is invalid, could be undefined, empty string, or null
                res.status(200).json({
                    message: "invalid order id",
                });
            }
        } catch (error) {
            // error invalid id type
            if (String(error).includes("CastError: Cast to ObjectId failed")) {
                res.status(200).json({
                    message: "id must be ObjectId, not string",
                });
            } else {
                // send response if any error occured
                res.status(500).json({ message: error });
            }
        }
    };
}
module.exports = {
    OrderController,
};
