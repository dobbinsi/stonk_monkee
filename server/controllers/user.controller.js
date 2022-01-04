const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    register: (req, res) => {
        console.log("in register");
        console.log(req.body);
        const user = new User(req.body);
        user.save()
            .then((newUser) => {
                console.log(newUser);
                res.json({
                    successMessage: "Thank you for registering!",
                    user: newUser
                })
            })
            .catch((err) => {
                console.log("registration failed");
                console.log(err);
                res.status(400).json(err);
            })
    },

    login: (req, res) => {
        User.findOne({ email: req.body.email })
            .then((userRecord) => {
                if (userRecord === null) {
                    res.status(400).json({ message: "Invalid Login Attempt" })
                }
                else {
                    bcrypt.compare(req.body.password, userRecord.password)
                        .then((isPasswordValid) => {
                            if (isPasswordValid) {
                                console.log("password is valid!");
                                res.cookie(
                                    "usertoken",
                                    jwt.sign(
                                        {
                                            id: userRecord._id,
                                            email: userRecord.email,
                                            username: userRecord.username
                                        },
                                        process.env.JWT_SECRET
                                    ),
                                    {
                                        httpOnly: true,
                                        expires: new Date(Date.now() + 9000000)
                                    },
                                ).json({
                                    message: "Login Successful",
                                    userLoggedIn: userRecord.username,
                                    userId: userRecord._id
                                })
                            }
                            else {
                                res.status(400).json({
                                    message: "Invalid Email/Password"
                                });
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                            res.status(400).json({
                                message: "Invalid Email/Password"
                            })
                        });
                }
            })
            .catch((err) => {
                console.log("error");
                res.status(400).json({
                    message: "Invalid Attempt"
                })
            })
    },
    logout: (req, res) => {
        console.log("logging out");
        res.clearCookie("usertoken");
        res.json({
            message: "You have successfully logged out"
        })
    },

    getOneUser: (req, res) => {
        User.findOne({ _id: req.params.userId })
            .then((oneUser) => {
                console.log(oneUser);
                res.json(oneUser);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    updateUser: (req, res) => {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            req.body,
            { new: true, runValidators: true }
        )
            .then((updatedUser) => {
                console.log(updatedUser);
                res.json({user: updatedUser});
            })
            .catch((err) => {
                console.log("updateUser failed...");
                res.status(400).json(err);
            })
    },

};
