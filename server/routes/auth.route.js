const { AuthController } = require("../controllers/AuthController");
const router = require("express").Router();

let auth = new AuthController();
router.post("/signup", auth.signUp);
router.post("/signin", auth.signIn);

module.exports = router;
