import express from 'express';

class VisitorRouter {
  constructor(visitorController) {
    this.visitorController = visitorController;
  }

  getRouter() {
    const router = express.Router();
    router.post("/raiseVisitorAccess", this.visitorController.raiseVisitorAccess);
    router.get("/approvals", this.visitorController.getAdminRequests);
    router.post("/adminAction", this.visitorController.adminAction);
    router.get("/:userID", this.visitorController.getVisitorRequests);
    return router;
  }
}

export default VisitorRouter;