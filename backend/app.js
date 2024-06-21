const express = require('express');
const mongoose = require('mongoose');
const requestRouter = require('./routers/requests');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGODB_URI)
.then(console.log("Connected to MongoDB!!"));

app.use(express.json());
app.use('/requests', requestRouter);

module.exports = app;
