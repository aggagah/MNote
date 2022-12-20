const { OrderController } = require("../controllers/OrderController");
const router = require("express").Router();

let order = new OrderController();
router.post("/getorder", order.getAllOrder);
router.post("/addorder", order.addOrder);
router.post("/getorderbydate", order.getOrderByDate);
router.post("/getorderbyname", order.getOrderByName);
router.delete("/deleteorder", order.deleteOrder);

module.exports = router;
