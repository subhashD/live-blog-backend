const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
  {
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String },
    facebookEmbedCode: { type: String },
    twitterEmbedCode: { type: String },
    linkUrl: { type: String },
    linkMetaData: { type: Object },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

const Post = mongoose.model('Post', postSchema)

module.exports = Post
