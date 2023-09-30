import UserController from '../controllers/users.controller.mjs';
import UserService from '../services/users.service.mjs';
import UserRouter from '../routes/users.router.mjs';

const userService = new UserService();
const userController = new UserController(userService);
const userRouter = new UserRouter(userController);

export default {
  service: userService,
  controller: userController,
  router: userRouter.getRouter(),
};