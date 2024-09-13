const express = require('express');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const UserModel = require('../models/userModel');
const authMiddleware = require('../middleware/authMiddleware');
const user = express.Router();
require('dotenv').config();
const secretKey = process.env.JWT_SECRET



user.get('/:userId', authMiddleware, async (req,res)=>{
    try {
        const user = await UserModel.findById(req.params.userId);
        res.status(201).json({id:user._id , username: user.username , email: user.email , password: user.password , bio: user.bio , profile: user.profilePicture})
    } catch (error) {
        res.status(500).json({msg: error.msg})
    }
})


user.post('/register', async (req, res) => {
    try {
        const { username, email, password , bio , profilePicture } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10); 
        const userDetails = new UserModel({ username, email, password: hashedPassword , bio , profilePicture});
        await userDetails.save();

        res.status(201).json({success: true, msg: 'User registered successfully', userId: userDetails._id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login route
user.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id },secretKey , { expiresIn: '1h' });
        res.cookie("token", token, {
            httpOnly: true, 
            sameSite: 'none',
            secure: process.env.NODE_ENV === 'production', 
            maxAge: 24 * 60 * 60 * 1000 
        });

        res.json({ 
            token, 
            user: { id: user._id, username: user.username, email: user.email } 
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

user.put('/profile/:userId', authMiddleware , async (req,res)=>{
    try {
        const {username , bio , profilePicture} = req.body;
        const user = await UserModel.findById(req.params.userId);
        if(!user){
            return res.status(404).json({msg:'User not found'})
        }
        user.username= username || user.username;
        user.bio = bio || user.bio;
        user.profilePicture = profilePicture || user.profilePicture;
        await user.save();
        res.status(201).json({success: true,msg:'Profile Updated'})
    } catch (error) {
        res.status(503).json({msg:error.msg})
    }
})

module.exports = user;
