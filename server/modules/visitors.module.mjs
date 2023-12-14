import VisitorController from '../controllers/visitors.controller.mjs';
import VisitorService from '../services/visitors.service.mjs';
import VisitorRouter from '../routes/visitors.router.mjs';

const visitorService = new VisitorService();
const visitorController = new VisitorController(visitorService);
const visitorRouter = new VisitorRouter(visitorController);

export default {
  service: visitorService,
  controller: visitorController,
  router: visitorRouter.getRouter(),
};