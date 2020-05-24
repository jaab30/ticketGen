require("dotenv").config();

module.exports =
{
    MONGO_URI: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET
}


