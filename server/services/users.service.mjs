import database from '../database/connection.mjs';
import { ObjectId } from 'mongodb';
import Response from '../models/response.model.mjs';

class UserService {
    constructor() {
    }
  
    getUserDetail =  async(userID) => {
        let collection = await database.collection("users");
        let query = { _id: new ObjectId(userID) };
        let user = await collection.findOne(query);
        if(user) {
            return user
        }
        return "User not found!";
    };
    
  }
  
  export default UserService;