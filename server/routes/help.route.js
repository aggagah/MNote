const { HelpController } = require("../controllers/HelpController");

class HelpRoutes {
    constructor() {
        this.helpController = new HelpController();
        this.router = require("express").Router();
        this.initRoutes();
    }

    initRoutes() {
        this.router.post("/addhelp", this.helpController.addHelp);
        this.router.get("/gethelp", this.helpController.getHelp);
    }
}

module.exports = new HelpRoutes().router;
