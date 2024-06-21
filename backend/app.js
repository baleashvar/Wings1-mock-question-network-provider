const express = require('express');
const mongoose = require('mongoose');
const requestRouter = require('./routers/requests');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGODB_URI)
.then(console.log("Connected to MongoDB!!"));

app.use(express.json());
app.use('/requests', requestRouter);

const cors = require('cors');
const axios = require('axios');
const corsOptions = {
    origin: process.env.URL_Frontend
};
console.log(corsOptions);
app.use(cors(corsOptions));

module.exports = app;
