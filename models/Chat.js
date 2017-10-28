var mongoose = require('mongoose');

var ChatSchema = new mongoose.Schema({
  type: String,
  room: String,
  groupId: String,
  profilePic: String,
  nickname: String,
  message: String,
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

module.exports = mongoose.model('Chat', ChatSchema);
