const express = require('express');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const UserModel = require('../models/userModel');
const user = express.Router();



user.get('/:userId', async (req,res)=>{
    try {
        const user = await UserModel.findById(req.params.userId);
        res.status(201).json({id:user._id , username: user.username , email: user.email , password: user.password , bio: user.bio , profile: user.profilePicture})
    } catch (error) {
        res.status(500).json({msg: error.msg})
    }
})


user.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Hash password with bcrypt
        const userDetails = new UserModel({ username, email, password: hashedPassword });
        await userDetails.save();

        res.status(201).json({ msg: 'User registered successfully', userId: userDetails._id });
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

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ 
            token, 
            user: { id: user._id, username: user.username, email: user.email } 
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

module.exports = user;
