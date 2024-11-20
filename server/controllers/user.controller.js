import { User } from '../models/user.model.js';

import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(400).json({ success: false, msg: "Please fill in all fields." });
        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ success: false, msg: "This email already exists." });
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({ name, email, password: hashedPassword });
        return res.status(201).json({ success: true, msg: "Account created successfully." });
    } catch (error) {
        return res.status(500).json({ success: false, msg: "Internal server error." });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ success: false, msg: "Please fill in all fields." });
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ success: false, msg: "Incorrect Email or Email not registered." });
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) return res.status(400).json({ success: false, msg: "Incorrect Password." });

        generateToken(res, user, `Welcome Back ${user.name}`);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, msg: "Failed to Login" });
    }
}