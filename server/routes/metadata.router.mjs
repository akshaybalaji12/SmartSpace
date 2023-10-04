import express from 'express';

class MetadataRouter {
  constructor(metadataController) {
    this.metadataController = metadataController;
  }

  getRouter() {
    const router = express.Router();
    router.get("/employees", this.metadataController.getEmployees);
    return router;
  }
}

export default MetadataRouter;