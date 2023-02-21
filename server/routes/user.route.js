const { UserController } = require("../controllers/UserController");

class UserRoutes {
    constructor() {
        this.userController = new UserController();
        this.router = require("express").Router();
        this.initRoutes();
    }

    initRoutes() {
        this.router.get("/getusers", this.userController.getUser);
        this.router.post("/getuserbyid", this.userController.getUserById);
        this.router.put("/updateuser", this.userController.updateUser);
    }
}

module.exports = new UserRoutes().router;
