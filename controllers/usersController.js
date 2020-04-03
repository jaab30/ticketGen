const User = require("../models/user");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");


module.exports = {

    register: function (req, res) {

        const { firstName, lastName, email, password, address, state, zip, phone } = req.body;

        if (!firstName || !lastName || !email || !password || !address || !state || !zip || !phone) {
            return res.status(400).jason("Please enter all fields")
        }

        User.findOne({ email })
            .then(user => {
                if (user) return res.status(400).jason("User already registered");
                // Create New User
                const newUser = new User({
                    firstName,
                    lastName,
                    email,
                    address,
                    state,
                    zip,
                    phone
                })
                // Generate the Hash for the password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) throw err;
                        console.log(newUser);

                        newUser.password = hash;
                        console.log(newUser);


                        // Save the new user to the DB
                        newUser.save()
                            .then(user => {
                                const { firstName, lastName, email, address, state, zip, phone } = user;

                                jwt.sign(
                                    { id: user.id }, config.get("jwtSecret"), { expiresIn: 3600 }, (err, token) => {
                                        if (err) throw err
                                        res.json({
                                            token,
                                            user: {
                                                id: user.id,
                                                firstName,
                                                lastName,
                                                email,
                                                address,
                                                state,
                                                zip,
                                                phone
                                            }
                                        })
                                    }
                                )
                            })
                    })
                })

            })
            .catch(err => console.log(err));
    },

    auth: function (req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).jason("Please enter all fields")
        }

        User.findOne({ email })
            .then(user => {
                if (!user) return res.status(400).json("User does not exist");

                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (!isMatch) return res.status(400).json("Password invalid")


                        jwt.sign(
                            { id: user.id }, config.get("jwtSecret"), { expiresIn: 3600 }, (err, token) => {
                                if (err) throw err
                                const { firstName, lastName, email, address, state, zip, phone } = user;
                                res.json({ token, user: {
                                        id: user.id,
                                        firstName,
                                        lastName,
                                        email,
                                        address,
                                        state,
                                        zip,
                                        phone
                                    }
                                })
                            }
                        )
                    })

            })
            .catch(err => console.log(err));
    },

    getUser: function (req, res) {
        User.findById(req.user.id)
        .select("-password")
            .then(user => res.json(user))
            .catch(err => console.log(res.status(404).json({ success: false })));
    }

}