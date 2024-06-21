require('dotenv').config();
const mongoose = require('mongoose');
const Request = require('../models/requests'); // Adjust the path if needed

const data = [
  {
    name: "user one",
    email: "userone@abc.com",
    type: "call",
    status: "new",
    raised_on: new Date("2023-04-13T09:36:33.559Z"),
    issue_description: "Hearing more cross talks in the calls",
    comment: ""
  },
  {
    name: "user one",
    email: "userone@abc.com",
    type: "data",
    status: "resolved",
    raised_on: new Date("2023-05-20T00:00:00.000Z"),
    issue_description: "Internet speed is too slow",
    comment: "We are working on adding up a few more towers, it will be resolved soon"
  }
];

async function insertData() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    console.log('Inserting data...');
    await Request.insertMany(data);
    console.log('Data inserted successfully');
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    mongoose.connection.close();
    console.log('Connection closed');
  }
}

insertData().catch(err => console.error('Error in script execution:', err));
