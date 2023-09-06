const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    try {
        console.log("BRUH")
        console.log(req.session.passport)
        if (req.session.passport == undefined || req.session.passport.user == undefined){
            return res.status(401).json({errorMessage: "Unauthorized"})
        }
        const uid = req.session.passport.user
        
        if (!uid) return res.status(401).json({errorMessage: "Unauthorized"})
        
        req.user = uid
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({errorMessage: "Unauthorized"});
    }
}

module.exports = auth;