const User = require("../models/user");
const bcrypt = require("bcryptjs");
const config = require("../config/config");
const jwt = require("jsonwebtoken");


module.exports = {

    register: async function (req, res) {
        try {
            const { firstName, lastName, email, password, confirmPassword, address, address2, city, state, zip, phoneNumber, role } = req.body;

            const formattedPhone = phoneNumber.replace(/[^\d]/g, '')
            const formattedZip = parseInt(zip.replace("-", ""));

            if (!firstName || !lastName || !email || !password || !address || !city || !state || !zip || !phoneNumber) {
                return res.status(400).json({ msg: "Please enter all fields" })
            }

            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

            if (reg.test(email) === false) return res.status(400).json({ msg: "Invalid Email Format" })

            if (isNaN(formattedZip)) return res.status(400).json({ msg: "Incorrect Zip Code" })

            if (formattedPhone.length !== 10) return res.status(400).json({ msg: "Incorrect Phone Number" })

            if (password.length < 6) return res.status(400).json({ msg: "Password must be at least 6 characters" })

            if (password !== confirmPassword) return res.status(400).json({ msg: "Passwords don't match" })

            const user = await User.findOne({ email })
            if (user) return res.status(400).json({ msg: "User already registered" });
            // Create New User
            const newUser = new User({
                firstName,
                lastName,
                email,
                address,
                address2,
                city,
                state,
                zip,
                phoneNumber,
                image: "",
                role
            })
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    // Save the new user to the DB
                    newUser.save()
                        .then(user => {
                            const { firstName, lastName, email, address, address2, city, state, zip, phoneNumber, role } = user;

                            jwt.sign(
                                { id: user.id }, config.jwtSecret, { expiresIn: 3600 }, (err, token) => {
                                    if (err) throw err
                                    res.json({
                                        token,
                                        user: {
                                            _id: user.id,
                                            firstName,
                                            lastName,
                                            email,
                                            address,
                                            address2,
                                            city,
                                            state,
                                            zip,
                                            phoneNumber,
                                            role
                                        }
                                    })
                                }
                            )
                        })
                })
            })

        } catch (err) {
            throw err;
        }

    },

    auth: async function (req, res) {
        try {
            const { email, password, role } = req.body;

            if (!email || !password || !role) {
                return res.status(400).json({ msg: "Please enter all fields" })
            }

            const user = await User.findOne({ email, role })

            if (!user) return res.status(400).json({ msg: "User does not exist" });

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: "Password invalid" })

                    jwt.sign(
                        { id: user.id }, config.jwtSecret, { expiresIn: 3600 }, (err, token) => {
                            if (err) throw err
                            const { firstName, lastName, email, address, address2, city, state, zip, phoneNumber, image, role } = user;
                            res.json({
                                token, user: {
                                    _id: user.id,
                                    firstName,
                                    lastName,
                                    email,
                                    address,
                                    address2,
                                    city,
                                    state,
                                    zip,
                                    phoneNumber,
                                    image,
                                    role
                                }
                            })
                        }
                    )
                })
        } catch (err) {
            throw err;
        }

    },

    getAllUsers: async function (req, res) {
        try {
            const user = await User.find()
                .select("-password")
                .populate("tickets")
            res.json(user)
        } catch (err) {
            throw err;
        }
    },
    getUser: async function (req, res) {
        try {
            const user = await User.findById(req.user.id)
                .select("-password")
                .populate("tickets")
            res.json(user)
        } catch (err) {
            throw err;
        }
    },

    updateUser: async function (req, res) {
        try {
            const { firstName, lastName, address, address2, city, state, zip, phoneNumber } = req.body;

            if (!firstName || !lastName || !address || !city || !state || !zip || !phoneNumber) {
                return res.status(400).json({ msg: "Please enter all fields" })
            }

            const data = await User.findByIdAndUpdate(req.params.id,
                {
                    firstName,
                    lastName,
                    address,
                    address2,
                    city,
                    state,
                    zip,
                    phoneNumber
                },
                { new: true })
            res.json(data)

        } catch (err) {
            throw err;
        }
    },
    userImageUpload: async function (req, res) {

        if (req.file === undefined) return res.status(404).json({ msg: "Please enter a file" })

        if (req.file.mimetype === "image/jpeg" || req.file.mimetype === "image/png") {
            try {
                const data = await User.findByIdAndUpdate(req.body.userId,
                    {
                        image: req.file.filename
                    }, { new: true })

                res.json(data)

            } catch (err) {
                throw err;
            }

        } else {
            return res.status(404).json({ msg: "Only PNG or JPG files please." })
        }
    }
}
