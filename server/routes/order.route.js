const {
    getAllOrder,
    getOrderByName,
    addOrder,
    getOrderByDate,
    deleteOrder,
} = require("../controllers/order.controllers");
const router = require("express").Router();

router.get("/getorder", getAllOrder);
router.post("/addorder", addOrder);
router.post("/getorderbydate", getOrderByDate);
router.post("/getorderbyname", getOrderByName);
router.delete("/deleteorder", deleteOrder);

module.exports = router;
