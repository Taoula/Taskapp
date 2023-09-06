const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const passport = require("passport");


//register
router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: process.env.CLIENT_URL,
		failureRedirect: "/login/failed",
	})
);


router.post("/", async (req, res) => {
  try {
    const {
      fName,
      lName,
      userRole,
      email,
      password,
      passwordVerify,
      profilePicture,
    } = req.body;

    if (!fName || !lName || !userRole || !email || !password || !passwordVerify)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields" });

    if (password.length < 6)
      return res.status(400).json({
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

    //hash password

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    //save new user

    const newUser = new User({
      fName,
      lName,
      userRole,
      email,
      passwordHash,
      profilePicture,
    });

    /*const savedUser = await newUser.save();

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
      .send();*/
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//login

router.post("/login", async (req, res) => {
  console.log("LOGGING IN BITch")
  try {
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

router.get("/logout", (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.sendStatus(200)
  });
});

//TODO SECURE
router.get("/loggedIn", (req, res) => {
  try {
    if (req.user == undefined || req.user == null ) {
      res.json(false)
    } else {
      res.send(true)
    }
  } catch (err) {
    console.error(err);
    res.json(false);
  }
});
 
router.get("/", auth, async (req, res) => {
  console.log("gettin user")
  try {
    console.log(req.user)
    const userId = req.user;
    const { fName, lName, email, userRole, profilePicture } =
      await User.findById(userId);
    res.json({ fName, lName, email, userRole, profilePicture });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.patch("/", auth, async (req, res) => {
  try {
    const userId = req.user;
    const { fName, lName, email, userRole, profilePicture } = req.body;
    const updatedUser = User.findByIdAndUpdate(
      { userId },
      { fName, lName, email, userRole, profilePicture }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
