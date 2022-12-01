const { UserController } = require("../controllers/UserController");
const router = require("express").Router();

let user = new UserController();
router.get("/getusers", user.getUser);
router.post("/getuserbyname", user.getUserByName);
router.put("/updateuser", user.updateUser);

module.exports = router;
