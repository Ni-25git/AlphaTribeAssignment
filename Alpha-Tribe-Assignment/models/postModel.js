const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    stockSymbol: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [String],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
},{versionKey:false});

const PostModel = mongoose.model('Post',postSchema);

module.exports=PostModel;