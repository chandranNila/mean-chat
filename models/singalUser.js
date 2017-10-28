var mongoose = require('mongoose');

var ChatSchema = new mongoose.Schema({
  /*singalUserId: number,*/
  singalUserName: String,
  message: String,
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Singalchat', ChatSchema);
