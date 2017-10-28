var mongoose = require('mongoose');

var ChatSchema = new mongoose.Schema({
  groupAdmin: String,
  groupName: String,
  groupAdminId: String,
  groupMember: Object,
  fieldname:String,
  originalname:String,
  encoding:String,
  mimetype:String,
  destination:String,
  filename:String,
  path:String,
  size:String,
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Group', ChatSchema);
