const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, default: 'new' },
  raised_on: { type: Date, default: Date.now },
  issue_description: { type: String, required: true },
  comment: { type: String }
});

module.exports = mongoose.model('requests', requestSchema);
