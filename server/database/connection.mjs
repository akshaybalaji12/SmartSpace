import { MongoClient } from 'mongodb';

const connectionString = process.env.MONGO_URI || "";
const client = new MongoClient(connectionString);

var connection;

try {
    connection = await client.connect();
    console.log("connection to MongoDB successful");
} catch(e) {
    console.error(e);
}

let database = connection.db("APP");

export default database;
