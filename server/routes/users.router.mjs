import express from 'express';

class UserRouter {
  constructor(userController) {
    this.userController = userController;
  }

  getRouter() {
    const router = express.Router();
    router.get("/:id", this.userController.getUserDetail);
    return router;
  }
}

export default UserRouter;