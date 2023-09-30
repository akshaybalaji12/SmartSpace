import database from '../database/connection.mjs';

class SeatService {
    constructor() {
    }

    bookSeat = async(seat) => {        
        let collection = await database.collection("seats");
        const result = collection.insertOne(seat);
        if(result) {
            return "Booking successful!"
        } else {
            return "Couldn't book seat. Please try later."
        }
    }
  
    getBookings =  async(userID) => {
        let collection = await database.collection("seats");
        let bookings = await collection.find({ 
            "userID": userID
        }).toArray();
        if(bookings) {
            return bookings
        } else {
            return "No seat(s) booked yet."
        }
    };

    getSeats =  async(date) => {
        let collection = await database.collection("seats");
        let seats = await collection.find({ 
            "date": date
        }).toArray();
        if(seats) {
            return seats
        } else {
            return ""
        }
    };
    
  }
  
  export default SeatService;