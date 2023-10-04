import MetadataController from '../controllers/metadata.controller.mjs';
import MetadataService from '../services/metadata.service.mjs';
import MetadataRouter from '../routes/metadata.router.mjs';

const metadataService = new MetadataService();
const metadataController = new MetadataController(metadataService);
const metadataRouter = new MetadataRouter(metadataController);

export default {
  service: metadataService,
  controller: metadataController,
  router: metadataRouter.getRouter()
};