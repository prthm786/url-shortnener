require("dotenv").config()
const { MongoClient } = require('mongodb');

// loading the MONGO_URI environment variable
const uri = `${process.env.MONGO_URI}`;
const client = new MongoClient(uri);

// function to create a mongodb connection and 
// returning the database object
async function connectToMongoDB() {
    try {

      // creating a mongodb connection
      await client.connect();
      console.log('Connected to MongoDB');

      const db = client.db('urls');
      // returning the database object 
      return db

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        return error;
    }
}

module.exports = {
    connectToMongoDB
}