// models/chatModel.js
const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  receiver: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  read: { type: Boolean, default: false }, 
  isDeleted: { type: Boolean, default: false }
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
