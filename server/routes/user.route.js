const {
    getUser,
    getUserByName,
    updateUser,
} = require("../controllers/user.controller");
const router = require("express").Router();

router.get("/getusers", getUser);
router.post("/getuserbyname", getUserByName);
router.put("/updateuser", updateUser);

module.exports = router;
