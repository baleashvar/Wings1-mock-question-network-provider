const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["new", "in-progress", "resolved", "rejected"],
    default: "new"
  },
  raised_on: {
    type: Date,
    default: Date.now
  },
  issue_description: {
    type: String,
    required: true
  },
  comment: {
    type: String
  }
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
