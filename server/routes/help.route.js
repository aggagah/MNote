const { addHelp, getHelp } = require("../controllers/help.controller");
const router = require("express").Router();

router.post("/addhelp", addHelp);
router.get("/gethelp", getHelp);

module.exports = router;
