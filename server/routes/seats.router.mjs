import express from 'express';

class SeatRouter {
  constructor(seatController) {
    this.seatController = seatController;
  }

  getRouter() {
    const router = express.Router();
    router.post("/bookSeat", this.seatController.bookSeat);
    router.get("/bookings/:userID&:date", this.seatController.getBookings);
    router.get("/:date", this.seatController.getSeats);
    return router;
  }
}

export default SeatRouter;