const {
    getAllOrder,
    getOrderByName,
    addOrder,
    getOrderByDate,
} = require("../controllers/order.controllers");
const router = require("express").Router();

router.get("/getorder", getAllOrder);
router.post("/addorder", addOrder);
router.post("/getorderbydate", getOrderByDate);
router.post("/getorderbyname", getOrderByName);

module.exports = router;
