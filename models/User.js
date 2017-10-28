/**
 * Created by mindzen on 29/7/17.
 */
var mongoose = require('mongoose');

var ChatSchema = new mongoose.Schema({
  type: String,
  username: String,
  password: String,
  mailId: String,
  status: String,
  profile: String,
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

module.exports = mongoose.model('User', ChatSchema);
