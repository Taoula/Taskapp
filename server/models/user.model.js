const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate")

const userSchema = new mongoose.Schema({
  fName: { type: String, required: true },
  lName: { type: String, required: true },
  userRole: { type: String, required: false },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
  googleId: { type: String, required: false },
  profilePicture: {
    type: String,
    default: "https://i.imgur.com/mrSQg7N.png",
  },
});

userSchema.plugin(findOrCreate)

const User = mongoose.model("user", userSchema);

module.exports = User;
