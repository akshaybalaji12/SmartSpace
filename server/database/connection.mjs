import { MongoClient } from 'mongodb';

const connectionString = process.env.MONGO_URI || "";
const client = new MongoClient(connectionString);

var connection;
var database;

try {
    connection = await client.connect();
    console.log("connection to MongoDB successful");
    database = connection.db("APP");
} catch(e) {
    console.error(e);
}

export default database;
