const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    const token = req.header("x-auth-token");
    // check if token is received
    if (!token) return res.status(401).json({ msg: "Unauthorized User" })

    try {
        // if it's valid
        const tokenDecoded = jwt.verify(token, config.get("jwtSecret"))
        // add user from payload
        req.user = tokenDecoded;
        next();
        
    } catch (e) {
        res.status(400).json({ msg: "Invalid token" })
    }
}

module.exports = auth;