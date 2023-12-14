import database from '../database/connection.mjs';
import { ConnectionCheckOutStartedEvent, ObjectId } from 'mongodb';
import Response from '../models/response.model.mjs';

class UserService {
    constructor() {
    }
  
    getUserDetail =  async(userID) => {
        let collection = await database.collection("users");
        let query = { userID: userID };
        let user = await collection.findOne(query);
        if(user) {
            return user
        }
        return "User not found!";
    };

    getDelegateDetails = async(userID) => {
        const userCollection = await database.collection("users");
        const seatCollection = await database.collection("seats");

        let manager = await userCollection.findOne({
            "userID": userID
        });
        if(manager) {
            const delegates = manager.delegates.map(delegate => {
                return delegate.userID;
            });

            delegates.sort();
            const userSort = { userID: 1 };
            //get all delegates details from user collections
            const delegateQuery = { userID: { $in: [...delegates] } };
            let delegateDetails = await userCollection.find(delegateQuery).sort(userSort).toArray();
            
            const today = new Date();
            const todayString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
            const dateSort = { date: -1 };

            await Promise.all(delegates.map(async (delegate, index) => {
                //get last 5 bookings
                const bookingHistory = await seatCollection.find({ 
                    "userID": delegate,
                    "date": { $lte: todayString }
                }).sort(dateSort).limit(5).toArray();
                delegateDetails[index].bookingHistory = [...bookingHistory];
            }));
            
            return delegateDetails;
        } else {
            return "Something went wrong! Please try again."
        }
    }

    getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();

    getSixMonthPrior = (today) => {
        let month = today.getMonth() + 1 - 5;
        if(month > 0) {
            return `${today.getFullYear()}-0${month}-01`;
        } else {
            month += 12;
            if(month < 10) return `${today.getFullYear() - 1}-0${month + 12}-01`;
            return `${today.getFullYear() - 1}-${month + 12}-01`;
        }
    }

    sortDatesToMonths = async (dates) => {
        let monthObj = {};
        dates.forEach(date => {
            const month = date.slice(5, 7);
            if(month in monthObj) {
                monthObj[month] = monthObj[month] + 1;
            } else {
                monthObj[month] = 1;
            }
        });
        return monthObj;
    }

    getStatistics = async (userID) => {
        const userCollection = await database.collection("users");
        const seatCollection = await database.collection("seats");

        const user = await userCollection.findOne({
            "userID": userID
        });
        if(user.isManager) {
            const delegates = user.delegates.map(delegate => {
                return delegate.userID;
            });

            delegates.sort();
            const userSort = { userID: 1 };
            const delegateQuery = { userID: { $in: [...delegates] } };
            let delegateDetails = await userCollection.find(delegateQuery).sort(userSort).toArray();
            delegates.unshift(userID);
            
            const today = new Date();
            const todayString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
            const startingDateString = this.getSixMonthPrior(today);
            const dateSort = { date: 1 };
            
            //get only dates booked by each user
            const options = { projection: { _id: 0, date: 1 } };

            await Promise.all(delegates.map(async (delegate) => {
                let bookingHistory = await seatCollection.find({ 
                    "userID": delegate,
                    "date": { $lte: todayString, $gte: startingDateString }
                }, options).sort(dateSort).toArray();
                bookingHistory = bookingHistory.map(history => history.date);
                const userStats = await this.sortDatesToMonths(bookingHistory);
                try {
                    if(delegate === userID) {
                        user.userStats = userStats;
                        delegateDetails.unshift({
                            ...user
                        });
                    } else {
                        const delegateDetail = delegateDetails.find((_delegate) => {
                           return  _delegate.userID === delegate;
                        });
                        delegateDetail.userStats = userStats;
                    }
                } catch (error) {
                    console.log(error)
                }
            }));
            
            return delegateDetails;
        } else {
            return "Something went wrong! Please try again."
        }
    }
    
  }
  
  export default UserService;