var mongoose = require('mongoose');

var ChatSchema = new mongoose.Schema({
  type: String,
  senderId: String,
  receiverId: String,
  senderName: String,
  receiverName: String,
  message: String,
  fieldname: String,
  originalname: String,
  encoding: String,
  mimetype: String,
  destination: String,
  filename: String,
  path: String,
  size: String,
  profilePic:String,
  senderProfile:String,
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('IndividualChat', ChatSchema);
