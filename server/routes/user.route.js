const { getUser } = require("../controllers/user.controller");
const router = require("express").Router();

router.get("/getusers", getUser);

module.exports = router;
