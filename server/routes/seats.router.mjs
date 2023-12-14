import express from 'express';

class SeatRouter {
  constructor(seatController) {
    this.seatController = seatController;
  }

  getRouter() {
    const router = express.Router();
    router.post("/bookSeat", this.seatController.bookSeat);
    router.get("/bookings/:userID", this.seatController.getBookings);
    router.post("/availability", this.seatController.getSeats);
    router.post("/modifyBooking", this.seatController.modifyBooking);
    return router;
  }
}

export default SeatRouter;