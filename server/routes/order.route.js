const {
    getAllOrder,
    getOrder,
    addOrder,
} = require("../controllers/order.controllers");
const router = require("express").Router();

router.get("/getorder", getAllOrder);
router.post("/addorder", addOrder);
router.post("/getorderbyname", getOrder);

module.exports = router;
