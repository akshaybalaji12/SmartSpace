import { ObjectId } from 'mongodb';
import database from '../database/connection.mjs';

class SeatService {
    constructor() {
    }

    bookSeat = async(seatArray) => {        
        let collection = await database.collection("seats");
        let result = collection.insertMany(seatArray);
        if(result) {
            return "Booking successful!"
        } else {
            return "Couldn't book seat. Please try later."
        }
    }

    modifyBooking = async(type, booking) => {        
        const collection = await database.collection("seats");

        if(type === 'edit') {
            const bookingID = booking._id;
            delete booking._id;
            const update = { $set: { ...booking } };
            let editBooking = await collection.updateOne({
                "_id": new ObjectId(bookingID)
            }, update);
            if(editBooking.modifiedCount === 1) {
                return "Booking Modified!";
            } else {
                return "Something went wrong! Please try again."
            }
        } else if(type === 'cancel') {
            let deleteBooking = await collection.deleteOne({
                "_id": new ObjectId(booking._id)
            });
            if(deleteBooking.deletedCount === 1) {
                return "Booking Cancelled!"
            } else {
                return "Something went wrong! Please try again."
            }
        }
        return "Something went wrong! Please try again."
    }
  
    getBookings =  async(userID) => {
        let collection = await database.collection("seats");
        const sort = { date: 1 }
        const today = new Date();
        const month = (today.getMonth() + 1) < 10 ? `0${(today.getMonth() + 1)}` : (today.getMonth() + 1);
        const date = (today.getDate()) < 10 ? `0${(today.getDate())}` : (today.getDate());
        const todayString = `${today.getFullYear()}-${month}-${date}`;
        let bookings = await collection.find({ 
            "userID": userID,
            "date": { $gte: todayString }
        }).sort(sort).toArray();
        if(bookings && bookings.length > 0) {
            return bookings
        } else {
            return "No seat(s) booked yet."
        }
    };

    getSeats =  async(dates, floorNo, zone) => {
        let collection = await database.collection("seats");
        let dateSeatArray = [];
        await Promise.all(dates.map(async (date) => {    
            let seats = await collection.find({ 
                "date": date,
                "floorNo": floorNo,
                "zone": zone
            }).toArray();
            if(seats.length > 0) {    
                let seatNos = seats.map(seat => {
                    return seat.seatNo
                });
                dateSeatArray.push(seatNos);
            }
        }));
        
        if(dateSeatArray.length === 0) {
            return "No bookings for date";
        } else {
            let unavailable = new Set([...dateSeatArray[0]]);
            let bookedSeatsArr = [...dateSeatArray[0]];
            for(let i=1;i<dateSeatArray.length;i++) {
                bookedSeatsArr = [...bookedSeatsArr, ...dateSeatArray[i]];
                let dateSeats = new Set([...dateSeatArray[i]]);
                unavailable = new Set([...unavailable].filter(seatNo => dateSeats.has(seatNo)));
            }
            const unavailableSeats = Array.from(unavailable);
            let bookedSeats = [...new Set(bookedSeatsArr)];
            bookedSeats = bookedSeats.filter(seat => !unavailableSeats.includes(seat));
            bookedSeats.sort();
            unavailableSeats.sort();
            
            const result = {
                bookedSeats,
                unavailableSeats
            }
            
            return result;
        }
    };
    
  }
  
  export default SeatService;