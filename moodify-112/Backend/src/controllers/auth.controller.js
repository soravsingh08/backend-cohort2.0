const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// --- REGISTER USER ---
async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body; // 'passworf' typo fixed

        const isAlreadyRegistered = await userModel.findOne({
            $or: [{ email }, { username }]
        });

        if (isAlreadyRegistered) {
            return res.status(400).json({
                message: "User with same email or name already exists"
            });
        }

        const hash = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            password: hash
        });

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }
        );

        // Cookie aur Response function ke ANDAR hona chahiye
        res.cookie("token", token);
        return res.status(201).json({
            message: "User registered successfully",
            user: { id: user._id, username: user.username, email: user.email },
            token
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// --- LOGIN USER ---
async function loginUser(req, res) {
    try {
        const { email, password, username } = req.body;

        // Find user by email OR username
        const user = await userModel.findOne({
            $or: [
                { username: username || "" }, // Agar username nahi hai toh empty string
                { email: email || "" }
            ]
        });

        // "Invalid Credentials" message (Generic for security)
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Password Compare (bcrypt.compare)
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Token Generation for Login
        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }
        );

        res.cookie("token", token);
        return res.status(200).json({
            message: "Login successful",
            user: { id: user._id, username: user.username, email: user.email },
            token
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { registerUser, loginUser }; // Dono export karein