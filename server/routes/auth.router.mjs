import express from 'express';

class AuthRouter {
  constructor(authController) {
    this.authController = authController;
  }

  getRouter() {
    const router = express.Router();
    router.post("/loginUser", this.authController.loginUser);
    router.post("/signUp", this.authController.createUser);
    return router;
  }
}

export default AuthRouter;