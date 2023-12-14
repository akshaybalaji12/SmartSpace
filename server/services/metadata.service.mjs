import database from '../database/connection.mjs';

class MetadataService {
    constructor() {
    }
  
    /* getEmployers =  async() => {
        let collection = await database.collection("metadata");
        const options = { projection: { _id: 0, employers: 1 } };
        let metadata = await collection.find({}, options).toArray();
        return metadata;
    }; */
  
    getFloorPlan =  async() => {
        let collection = await database.collection("metadata");
        const options = { projection: { _id: 0, floors: 1 } };
        let metadata = await collection.find({}, options).toArray();
        return metadata;
    };
    
  }
  
  export default MetadataService;