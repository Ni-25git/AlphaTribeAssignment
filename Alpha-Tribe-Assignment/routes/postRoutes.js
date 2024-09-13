const express = require('express');
const PostModel = require('../models/postModel');
const authMiddleware = require('../middleware/authMiddleware');
const post = express.Router();



post.get('/:postId', async (req,res)=>{
    try {
        const post = await PostModel.findById(req.params.postId).populate('user' , 'username')
        if(!post){
            return res.status(404).json({msg: 'Post not found'})
        }
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({msg: error.msg})
    }
});

post.get('/', async (req, res) => {
    try {
        const { stockSymbol, tags, sortBy } = req.query;

        
        let query = {};

        
        if (stockSymbol) {
            query.stockSymbol = stockSymbol;
        }

        
        if (tags) {
            query.tags = { $in: tags.split(',') };
        }

        
        let posts = PostModel.find(query).populate('user', 'username');

        
        if (sortBy === 'date') {
            posts = posts.sort({ createdAt: -1 }); 
        } else if (sortBy === 'likes') {
            posts = posts.sort({ likesCount: -1 }); 
        }

    
        const result = await posts.exec();

        
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});




post.post('/', authMiddleware, async (req,res)=>{
    try {
        const {stockSymbol , title , description , tags } = req.body;
        if(!stockSymbol || !title || !description || !tags){
            return res.status(400).json({msg: 'All fields are required'});
        }
        const newPost = new PostModel({user: req.user.id , stockSymbol , title , description , tags, createdAt: Date.now()});
        await newPost.save();
        res.status(201).json({success: true,postId: newPost._id , msg:'Post Created Successfully'});
    } catch (error) {
        res.status(500).json({msg:error.msg})
    }
});

post.delete('/:postId', authMiddleware, async (req, res) => {
    try {

        const post = await PostModel.findById(req.params.postId);
        
        
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        if (post.user.toString() !== req.user.id.toString()) {
            return res.status(401).json({ msg: 'Not Authorized' });
        }

        
        await post.deleteOne();

        res.status(200).json({ msg: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({success: true, msg: error.message });
    }
});







module.exports = post;