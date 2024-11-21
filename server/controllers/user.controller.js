import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';

export const register = async (req, res) => {
    try {
        console.log(req.body);

        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(400).json({
            success: false, msg: "Please fill in all fields."
        });

        const user = await User.findOne({
            email
        });

        if (user) return res.status(400).json({
            success: false, msg: "This email already exists."
        });

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

export const logout = async (_, res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge: 0}.json({ success: true, msg: "Logged Out Successfully" }));
    } catch (error) {
        return res.status(500).json({ success: false, msg: "Failed to Logout" });
    }
}

export const getUserProfile = async (req, res) => {
    try {
        //using middleware
        const userID = req.id;
        const user = await User.findById(userID).select("-password");
        if(!user) return res.status(404).json({ success: false, msg: "User not found" });
        return res.status(200).json({ success: true, user });

    } catch (error) {
        return res.status(500).json({ success: false, msg: "Failed to load user" });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const userID = req.id;
        const{ name } = req.body;
        const profilePhoto = req.file;

        const user = await User.findById(userID);
        if(!user) return res.status(404).json({ success: false, msg: "User not found" });

        //extracating the public_id from the user profile photo
        if(user.photoUrl){
            const publicId = user.photoUrl.split("/").pop().split(".")[0];
            await deleteMediaFromCloudinary(publicId);
        }

        //uploading the new profile photo
        const cloudResponse = await uploadMedia(profilePhoto.path);
        const photoUrl = cloudResponse.secure_url;

        const updatedData = { name, photoUrl };
        const updatedUser = await User.findByIdAndUpdate(userID, updatedData, { new: true }).select("-password");

        return res.status(200).json({ success: true, user: updatedUser, msg: "Profile updated successfully" });
        
    } catch (error) {
        return res.status(500).json({ success: false, msg: "Failed to update profile" });
    }
}