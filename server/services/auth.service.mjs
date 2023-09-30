import database from '../database/connection.mjs';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = Number(process?.env?.SALT_ROUNDS);

class AuthService {
    constructor() {
    }
  
    loginUser =  async(user) => {
        const { username, password } = user;

        let collection = await database.collection("users");
        const loggingUser = await collection.findOne({
            "username": username
        });

        if(!loggingUser) return "Username not found!";

        const isMatch = await bcrypt.compare(password, loggingUser?.password)
        if(isMatch) {
            delete loggingUser.password;
            return loggingUser;
        } else {
            return "Password incorrect!";
        }        
    };
  
    createUser = async(user) => {
        const { username, password } = user;
        let collection = await database.collection("users");
        let isUserPresent = await collection.findOne({
            "username": username
        });

        if(isUserPresent) {
            return "Username already present";
        } else {
            const result = await new Promise((resolve, reject) => {
                bcrypt.hash(password, SALT_ROUNDS, async (err, hash) => {                      
                    if(err) {
                        console.log("error in encryption " + err);
                        reject("Unexpected error occured. Please try again later.");
                    }
                    user.password = hash;
                    const newUser = await collection.insertOne(user);
                    resolve(newUser);
                });
            });
            return result;
        }
    }
    
  }
  
  export default AuthService;