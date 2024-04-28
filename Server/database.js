require("dotenv").config()
const { MongoClient } = require('mongodb');

const uri = `${process.env.MONGO_URI}`;
const client = new MongoClient(uri);

async function connectToMongoDB() {
    try {
      await client.connect();
      console.log('Connected to MongoDB');

      const db = client.db('urls');
      return db

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        return error;
    }
}

module.exports = {
    connectToMongoDB
}