import express from 'express';

class UserRouter {
  constructor(userController) {
    this.userController = userController;
  }

  getRouter() {
    const router = express.Router();
    router.get("/:userID", this.userController.getUserDetail);
    router.get("/getDelegates/:userID", this.userController.getDelegateDetails);
    router.get("/getStatistics/:userID", this.userController.getStatistics);
    return router;
  }
}

export default UserRouter;