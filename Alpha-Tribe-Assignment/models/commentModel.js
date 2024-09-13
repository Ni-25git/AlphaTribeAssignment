const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    comment: { type: String, required: true },
},{versionKey: false});


const CommentModel = mongoose.model('Comment',commentSchema);

module.exports = CommentModel;