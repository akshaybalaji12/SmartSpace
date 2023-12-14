import Seat from '../models/seats.model.mjs';
import Response from '../models/response.model.mjs';

class SeatController {
  constructor(seatService) {
    this.seatService = seatService;
  }

  getSeats = async (req, res) => {
    const { dates, floorNo, zone } = req.body;
    let result = await this.seatService.getSeats(dates, floorNo, zone);
    let response;
    if(typeof result === 'string') {
        response = new Response(400, {}, result);
        res.send(response).status(400);
    } else {
        response = new Response(200, result);
        res.send(response).status(200);
    }
  }

  bookSeat = async (req, res) => {
    const { userID, floorNo, zone, seatNo, dates } = req.body;
    let seatArray = [];
    dates.forEach(date => {
       let seat = new Seat(userID, floorNo, zone, seatNo, date);
       seatArray.push(seat);
    });
    let result = await this.seatService.bookSeat(seatArray);
    let response;
    if(result.indexOf("success") >= -1) {
      response = new Response(201, result);
      res.send(response).status(201);
    } else {
      response = new Response(400, result);
      res.send(response).status(400);
    }
  };

  getBookings = async (req, res) => {
    const { userID } = req.params;
    let result = await this.seatService.getBookings(userID);
    let response;
    if(typeof result === 'string') {
        response = new Response(400, {}, result);
        res.send(response).status(400);
    } else {
        response = new Response(200, result);
        res.send(response).status(200);
    }
  }

  modifyBooking = async (req, res) => {
    const { type, booking } = req.body;
    let result = await this.seatService.modifyBooking(type, booking);
    let response;
    if(result.indexOf("Booking") >= -1) {
      response = new Response(201, result);
      res.send(response).status(201);
    } else {
      response = new Response(400, result);
      res.send(response).status(400);
    }
  };

}

export default SeatController;