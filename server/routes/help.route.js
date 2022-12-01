const { HelpController } = require("../controllers/HelpController");
const router = require("express").Router();

let help = new HelpController();
router.post("/addhelp", help.addHelp);
router.get("/gethelp", help.getHelp);

module.exports = router;
