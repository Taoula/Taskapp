// models/stripeData.model.js
const mongoose = require("mongoose");

const stripeDataSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  customerId: {
    type: String,
    required: true,
  },
  subscriptionId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("StripeData", stripeDataSchema);
