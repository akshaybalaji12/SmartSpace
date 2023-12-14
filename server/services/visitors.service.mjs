import { ObjectId } from 'mongodb';
import database from '../database/connection.mjs';

class VisitorService {
    constructor() {
    }
  
    raiseVisitorAccess = async(visitor) => {
        let collection = await database.collection("visitors");
        const result = collection.insertOne(visitor);
        if(result) {
            return "Visitor Request raised."
        } else {
            return "Couldn't raise request. Please try later."
        }
    };

    getVisitorRequests = async(userID) => {
        let collection = await database.collection("visitors");
        const sort = { lastUpdated: -1, visitingDate: 1 }
        const today = new Date();
        const month = (today.getMonth() + 1) < 10 ? `0${(today.getMonth() + 1)}` : (today.getMonth() + 1);
        const date = (today.getDate()) < 10 ? `0${(today.getDate())}` : (today.getDate());
        const todayString = `${today.getFullYear()}-${month}-${date}`;
        let requests = await collection.find({ 
            "userID": userID,
            "visitingDate": { $gte: todayString }
        }).sort(sort).toArray();
        if(requests && requests.length > 0) {
            return requests
        } else {
            return "No visitor requests found."
        }
    }

    getAdminRequests = async() => {
        let collection = await database.collection("visitors");
        const sort = { createdOn: -1 }
        let requests = await collection.find({ 
            "status": "Requested"
        }).sort(sort).toArray();
        if(requests && requests.length > 0) {
            return requests
        } else {
            return "No pending requests."
        }
    }

    adminAction = async(docID, action) => {
        let collection = await database.collection("visitors");
        const newStatus = action == 'approve' ? 'Approved' : 'Rejected';
        const today = new Date();
        const month = (today.getMonth() + 1) < 10 ? `0${(today.getMonth() + 1)}` : (today.getMonth() + 1);
        const date = (today.getDate()) < 10 ? `0${(today.getDate())}` : (today.getDate());
        const todayString = `${today.getFullYear()}-${month}-${date}`;
        const update = { $set: { 
            "status": newStatus,
            "lastUpdated": todayString
         } };
        let adminAction = await collection.updateOne({
            "_id": new ObjectId(docID)
        }, update);
        if(adminAction.modifiedCount === 1) {
            return newStatus;
        } else {
            return "Something went wrong! Please try again."
        }
    }
    
  }
  
  export default VisitorService;