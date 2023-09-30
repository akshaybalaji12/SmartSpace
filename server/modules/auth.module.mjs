import AuthController from '../controllers/auth.controller.mjs';
import AuthService from '../services/auth.service.mjs';
import AuthRouter from '../routes/auth.router.mjs';

const authService = new AuthService();
const authController = new AuthController(authService);
const authRouter = new AuthRouter(authController);

export default {
  service: authService,
  controller: authController,
  router: authRouter.getRouter(),
};