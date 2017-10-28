var mongoose = require('mongoose');

var ChatSchema = new mongoose.Schema({
  fieldname: String,
  originalname: String,
  encoding: String,
  mimetype: String,
  destination: String,
  filename: String,
  path: String,
  size: String,
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('fileDetails', ChatSchema);
