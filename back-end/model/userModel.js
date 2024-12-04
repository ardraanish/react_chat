const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  friendRequests: [
    {
      senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      status: { type: String, enum: ['pending', 'accepted', 'denied'], default: 'pending' },
    },
  ],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});


const User = mongoose.model('User', userSchema);

module.exports = User;
