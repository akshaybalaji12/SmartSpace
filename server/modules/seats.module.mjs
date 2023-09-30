import SeatController from '../controllers/seats.controller.mjs';
import SeatService from '../services/seats.service.mjs';
import SeatRouter from '../routes/seats.router.mjs';

const seatService = new SeatService();
const seatController = new SeatController(seatService);
const seatRouter = new SeatRouter(seatController);

export default {
  service: seatService,
  controller: seatController,
  router: seatRouter.getRouter(),
};