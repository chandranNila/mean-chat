var mongoose = require('mongoose');

var ChatSchema = new mongoose.Schema({
  room: String,
  friendName: String,
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Addfriends', ChatSchema);
