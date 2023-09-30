import database from '../database/connection.mjs';
import { ObjectId } from 'mongodb';
import Response from '../models/response.model.mjs';

class UserService {
    constructor() {
    }
  
    getUserDetail =  async(userID) => {
        let collection = await database.collection("users");
        let query = { _id: new ObjectId(userID)};
        let user = await collection.findOne(query);
        const response = new Response(200, user);
        console.log(response)
        return response;
    };
    
  }
  
  export default UserService;