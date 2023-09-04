const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const StripeData = require("./models/stripeData.model");

// Function to create a Stripe customer
async function createStripeCustomer(email) {
  const customer = await stripe.customers.create({
    email: email,
    // Add more customer details here if needed
  });
  return customer.id;
}

// Function to create a Stripe subscription for a customer
async function createStripeSubscription(customerId, priceId) {
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: "priceId" }],
  });
  return subscription.id;
}

// Function to create a StripeData record and associate it with a user's email
async function createStripeData(email, customerId, subscriptionId) {
  const stripeData = new StripeData({
    email,
    customerId,
    subscriptionId,
  });
  return await stripeData.save();
}

module.exports = {
  createStripeCustomer,
  createStripeSubscription,
  createStripeData,
};
