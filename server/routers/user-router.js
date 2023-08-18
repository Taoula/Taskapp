const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth")
const Stripe = require("../Stripe")
const productToPriceMap = {
  MONTHLY: "price_1NUbO0B6OZ4o5CX1MScF90G6",
  YEARLY: "price_1NUbOVB6OZ4o5CX12hCEXbqb",
};

//register
router.post("/", async (req, res) => {
  try {
    const { fName, lName, userRole, email, password, passwordVerify } =
      req.body;

    if (!fName || !lName || !userRole || !email || !password || !passwordVerify)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields" });

    if (password.length < 6)
      return res
        .status(400)
        .json({
          errorMessage: "Your password must be longer than 6 characters",
        });

    if (password !== passwordVerify)
      return res
        .status(400)
        .json({ errorMessage: "Please enter the same password twice" });

    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({
        errorMessage: "An account with this email already exists",
      });

    //Initialize stripe user

    const customer = await Stripe.addNewCustomer(email);
    //res.send("Customer created: " + JSON.stringify(customer));
    req.session.customerID = customer
    const billingID = customer.id

    //hash password

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    //save new user

    const newUser = new User({
      fName,
      lName,
      userRole,
      billingID,
      email,
      passwordHash,
      plan: "none",
      hasTrial: false,
      endDate: null
    });

    const savedUser = await newUser.save();

    //sign token

    const token = jwt.sign(
      {
        user: savedUser._id,
      },
      process.env.JWT_SECRET
    );

    //send token in a http-only cookie

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (err) {
    console.error(err.errorMessage);
    res.status(500).json({ errorMessage: err.message });
  }
});

//login

router.post("/login", async (req, res) => {
  try {
    req.session.customerID = customer
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields" });

    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(401).json({ errorMessage: "Wrong user " });

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );

    if (!passwordCorrect)
      return res.status(401).json({ errorMessage: "Wrong password" });

    //sign token

    const token = jwt.sign(
      {
        user: existingUser._id,
      },
      process.env.JWT_SECRET
    );

    //send token in a http-only cookie
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
});

router.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.json(false);

    jwt.verify(token, process.env.JWT_SECRET);
    res.send(true);
  } catch (err) {
    console.error(err);
    res.json(false);
  }
});

router.get("/", auth, async (req, res) => {
  try {
      const userId = req.user;
      const {fName, lName, email, userRole, billingID, plan, hasTrial, endDate} = await User.findById(userId);
      res.json({fName, lName, email, userRole, billingID});
  } catch (err){
      console.error(err)
      res.status(500).send()
  }
});

router.post("/checkout", auth, async(req, res) => {
  try {
    const userId = req.user
    const {billingID} = await User.findById(userId)

    const {  product } = req.body;
    const price = productToPriceMap[product.toUpperCase()]; 
    const session = await Stripe.createCheckoutSession(billingID, price);
    console.log(session)
    //Stripe.redirectToCheckout({sessionId: session.id})
    res.json(session)
  } catch (err) {
    console.error(err)
    res.status(501).send()
  }
})

//PATCH NONSENSITIVE USER DATA
router.patch("/", auth, async(req, res) => {
  try{
    const userId = req.user
    const {billingID} = await User.findById(userId)
    const {fName, lName, email, userRole, plan, hasTrial, endDate} = req.body
    await User.findOneAndUpdate({_id: userId}, {fName, lName, email, userRole, plan, hasTrial, endDate})
  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
})

module.exports = router;
