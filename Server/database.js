import dotconfig from "dotenv"
dotconfig.config();
// const { MongoClient } = require('mongodb');
import { MongoClient } from 'mongodb';

// loading the MONGO_URI environment variable
const uri = `${process.env.MONGO_URI}`;

const client = new MongoClient(uri, {
    maxPoolSize: 5, 
});

// function to create a mongodb connection 
async function connect(retryCount, maxRetries) {
    try {

      // creating a mongodb connection
      await client.connect();
      console.log('Connected to MongoDB');

    } catch (error) {

        if (retryCount < maxRetries) {
            const delay = Math.pow(2, retryCount) * 1000; 
            console.error(`Error connecting to MongoDB, retrying in ${delay / 1000} seconds...`, error.message);
            await new Promise(resolve => setTimeout(resolve, delay));
            return connect(retryCount + 1, maxRetries);
          } else {
            console.error('Maximum number of retries reached, unable to connect to MongoDB:', error.message);
            // throw error;
            process.exit(1);
          }
    }
}

// creating a function that returns the client object
function getClient() {
    return client;
}

// creating a function that returns the client.db object
function getDatabase() {
    return client.db('urls');
}

export {
    connect,
    getClient,
    getDatabase
}