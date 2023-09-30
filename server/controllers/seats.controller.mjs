import Seat from '../models/seats.model.mjs';
import Response from '../models/response.model.mjs';

class SeatController {
  constructor(seatService) {
    this.seatService = seatService;
  }

  getSeats = async (req, res) => {
    const { date } = req.params;
    let result = await this.seatService.getSeats(date);
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
    const { userID, floorNo, zone, seatNo, date } = req.body;
    const seat = new Seat(userID, floorNo, zone, seatNo, date);
    let result = await this.seatService.bookSeat(seat);
    let response;
    if(result.indexOf("later") >= -1) {
      response = new Response(400, result);
    } else {
      response = new Response(201, result);
    }
    return res.send(response).status(201);
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

}

export default SeatController;