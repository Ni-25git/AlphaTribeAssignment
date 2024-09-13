const express = require('express');
const CommentModel = require('../models/commentModel');
const authMiddleware = require('../middleware/authMiddleware');
const PostModel = require('../models/postModel');
const commentPost = express.Router();



commentPost.post("/:postId", authMiddleware, async (req, res) => {
    try {
        const { comment } = req.body;
        
        if (!comment) {
            return res.status(400).json({ msg: 'Comment cannot be empty' });
        }

        const newComment = new CommentModel({
            user: req.user.id,
            post: req.params.postId,
            comment
        });
        
        await newComment.save();
        res.status(201).json({success: true, commentID: newComment._id, msg: 'Comment added successfully' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

commentPost.delete('/:postId/comments/:commentId',authMiddleware, async (req,res)=>{
try {
    const comment = await CommentModel.findById(req.params.commentId);
    if(!comment){
        return res.status(404).json({msg:'Comment not found'})
    }
    if (comment.user.toString() !== req.user.id.toString()) {
        return res.status(401).json({ message: 'Not authorized' });
    }
    await comment.deleteOne();
    res.json({ success: true, message: 'Comment deleted successfully' });
} catch (error) {
    res.status(500).json({ msg: error.message });
}
})

module.exports = commentPost;
