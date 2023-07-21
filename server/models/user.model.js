const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fName: {type: String, required: true},
    lName: {type: String, required: true},
    userRole: {type: String, required: true},
    email: {type: String, required: true},
    passwordHash: {type: String, required: true},
    billingID: {type: String, required: true},
    plan: {
      type: String,
      enum: ["none", "monthly", "yearly"],
      default: "none",
    },
    hasTrial: {
      type: Boolean,
      default: false,
    },
    endDate: {
      type: Date,
      default: null,
    },
})

const User = mongoose.model("user", userSchema);

module.exports = User;