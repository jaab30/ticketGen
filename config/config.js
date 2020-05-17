require("dotenv").config();

module.exports =
{
    MONGO_URI: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET
}
// module.exports =
// {
//     MONGO_URI: "mongodb+srv://jaab30:jaab30@ticketgen-6bfeu.mongodb.net/tixgen?retryWrites=true&w=majority",
//     jwtSecret: "tix_gen_123"
// }

