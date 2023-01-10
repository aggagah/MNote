const { AuthController } = require("../controllers/AuthController");
class AuthRoutes {
    constructor() {
        this.authController = new AuthController();
        this.router = require("express").Router();
        this.initRoutes();
    }

    initRoutes() {
        this.router.post("/signup", this.authController.signUp);
        this.router.post("/signin", this.authController.signIn);
    }
}

module.exports = new AuthRoutes().router;
