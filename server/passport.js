const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/user.model")
const passport = require("passport");



passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: "/auth/google/callback",
			scope: ["profile", "email"],
		},
		async function (accessToken, refreshToken, profile, callback) {
			try {
                const foundUser = await User.findOne({ googleId: profile.id })
                
                //console.log(profile)
                //TODO reoptimize?
                if (foundUser == null){
                    const fName = profile.name.givenName
                    const lName = profile.name.familyName
                    const email = profile.emails[0].value
                    const googleId = profile.id
                    const profilePicture = profile.photos[0].value

                    const newUser = new User({
                        fName, lName, email, googleId, profilePicture, passwordHash: " "
                    })

                    const savedUser = await newUser.save()
                    return callback(null, savedUser);

                } else {
                    console.log("FUID" + foundUser._id)
                    return callback(null, foundUser)
                }
                } catch(err){
                    console.error(err)
                }
        }
	)
);

passport.serializeUser((user, done) => {
    console.log("su is " + user)
    console.log("suid is " + user._id)
	done(null, user._id)
});

passport.deserializeUser((_id, done) => {
    User.findById(_id, function(err, user) {
        done(err, user);
    });
});