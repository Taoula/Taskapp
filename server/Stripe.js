const stripe = require('stripe');
//const dotenv = require('dotenv')
const STRIPE_SECRET_KEY = "sk_test_51NUGgYB6OZ4o5CX1z1o0IIpN2vjGxMQ9TxChlo5iT6o4ctimbyNIVFOu4VauIpyYfuo7z7Vne1kfmun6JZSEGHiP00uLp9fxQq"

const Stripe = stripe(STRIPE_SECRET_KEY, {
	apiVersion: '2022-11-15'
});

const createCheckoutSession = async (customerID, price) => {
	const session = await Stripe.checkout.sessions.create({
	  mode: 'subscription',
	  payment_method_types: ['card'],
	  customer: customerID,
	  line_items: [
		{
		  price,
		  quantity: 1
		}
	  ],
	  subscription_data: {
		trial_period_days: 14
	  },
  
	  success_url: `http://localhost:3000/?session_id={CHECKOUT_SESSION_ID}`,
	  cancel_url: "http://localhost:3000/"
	})
  
	return session
  }

const addNewCustomer = async (email) => {
	try{
		const customer = await Stripe.customers.create({
			email,
			description: 'New Customer'
		}) 
		return customer
	} catch (err){
		console.error(err)
	}
}

const getCustomerByID = async (id) => {
	const customer = await Stripe.customers.retrieve(id) 
    return customer
}

module.exports = {
	addNewCustomer,
	getCustomerByID,
	createCheckoutSession
}