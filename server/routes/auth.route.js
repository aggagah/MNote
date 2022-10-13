const { signUp, signIn } = require("../controllers/auth.controller");
const router = require("express").Router();

router.post("/signup", signUp);
router.post("/signin", signIn);

module.exports = router;
