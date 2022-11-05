const { getUser,updateUser } = require("../controllers/user.controller");
const router = require("express").Router();

router.get("/getusers", getUser);
router.put("/updateuser", updateUser)

module.exports = router;
