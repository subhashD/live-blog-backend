const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    isPublished: { type: Boolean, default: false },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
