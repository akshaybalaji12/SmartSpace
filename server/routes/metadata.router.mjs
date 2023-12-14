import express from 'express';

class MetadataRouter {
  constructor(metadataController) {
    this.metadataController = metadataController;
  }

  getRouter() {
    const router = express.Router();
    //router.get("/employers", this.metadataController.getEmployers);
    router.get("/floorPlan", this.metadataController.getFloorPlan)
    return router;
  }
}

export default MetadataRouter;