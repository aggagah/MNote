const { UserController } = require("../controllers/UserController");
const router = require("express").Router();

let user = new UserController();
router.get("/getusers", user.getUser);
router.post("/getuserbyid", user.getUserById);
router.put("/updateuser", user.updateUser);

module.exports = router;
