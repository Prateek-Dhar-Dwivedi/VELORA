const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const router = express.Router();
const User = require("../models/User");

const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID
);

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser =
            await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.json(user);
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user =
            await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }

        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
        };

        res.json({
            token,
            user: userData,
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
});

router.post("/google", async (req, res) => {
    try {
        const { credential } = req.body;

        const ticket =
            await client.verifyIdToken({
                idToken: credential,
                audience:
                    process.env.GOOGLE_CLIENT_ID,
            });

        const payload =
            ticket.getPayload();

        const {
            email,
            name,
        } = payload;

        let user =
            await User.findOne({ email });

        if (!user) {
            user = await User.create({
                name,
                email,
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            token,
            user,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message:
                "Google Login Failed",
        });
    }
});

module.exports = router;