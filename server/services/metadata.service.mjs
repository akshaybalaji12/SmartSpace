import database from '../database/connection.mjs';

class MetadataService {
    constructor() {
    }
  
    getEmployees =  async() => {
        let collection = await database.collection("metadata");
        const options = { projection: { _id: 0, employees: 1 } };
        let metadata = await collection.find({}, options).toArray();
        return metadata;
    };
    
  }
  
  export default MetadataService;