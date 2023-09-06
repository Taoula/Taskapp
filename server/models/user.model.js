const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fName: { type: String, required: true },
  lName: { type: String, required: true },
  userRole: { type: String, required: true },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
  profilePicture: {
    type: String,
    default: "https://i.imgur.com/mrSQg7N.png",
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
