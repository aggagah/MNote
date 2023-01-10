const { OrderController } = require("../controllers/OrderController");

class OrderRoutes {
    constructor() {
        this.orderController = new OrderController();
        this.router = require("express").Router();
        this.initRoutes();
    }

    initRoutes() {
        this.router.post("/getorder", this.orderController.getAllOrder);
        this.router.post("/addorder", this.orderController.addOrder);
        this.router.post(
            "/getorderbydate",
            this.orderController.getOrderByDate
        );
        this.router.post(
            "/getorderbyname",
            this.orderController.getOrderByName
        );
        this.router.delete("/deleteorder", this.orderController.deleteOrder);
    }
}

module.exports = new OrderRoutes().router;
