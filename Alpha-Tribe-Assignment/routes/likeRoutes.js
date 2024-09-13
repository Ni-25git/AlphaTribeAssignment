const express= require('express');
const LikeModel = require('../models/likeModel');
const PostModel = require('../models/postModel');
const authMiddleware = require('../middleware/authMiddleware');
const likePost = express.Router();


likePost.post('/:postId', authMiddleware, async (req, res) => {
    try {

        const likeExists = await LikeModel.findOne({ user: req.user.id, post: req.params.postId });
        if (likeExists) {
            return res.status(400).json({ message: 'Post already liked' });
        }

        
        await LikeModel.create({ user: req.user.id, post: req.params.postId });

        const post = await PostModel.findById(req.params.postId);
        post.likes.push(req.user._id); 

        await post.save(); 

        res.json({ success: true, message: 'Post liked' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

likePost.delete("/:postId", authMiddleware , async (req,res)=>{
    try {
        const like = await LikeModel.findOne({ user: req.user.id, post: req.params.postId });
        if (!like) {
            return res.status(400).json({ message: 'Post not liked yet' });
        }
        await like.deleteOne();
        const post = await PostModel.findById(req.params.postId);
        post.likesCount -= 1;
        await post.save();
        res.json({ success: true, message: 'Post unliked' });
    } catch (error) {
        res.status(500).json({success: true, msg: error.message });
    }
})



module.exports= likePost;