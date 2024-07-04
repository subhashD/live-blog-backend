const PostModel = require('../models/post') // Database Access
const cheerio = require('cheerio')
const axios = require('axios')
const logger = require('../util/logger/logger')
const Helper = require('../util/helpers/helper')

class PostService {
  /**
   * @description Create an instance of AuthService
   */
  constructor() {
    // Create instances here
  }

  /**
   * @description Attempt to create a user with the provided object
   * @param body {object} Object containing all body fields to
   * register user
   * @returns {Promise<{success: boolean, message: *, data: *}>}
   */
  createPost = async (blogId, body, files = null) => {
    try {
      let fileDetails = null
      if (files) {
        fileDetails = files.map((file) => ({
          filename: file.originalname,
          url: file.location || file.path, // S3 or local path
        }))
      }

      const postCreate = {
        blogId: blogId,
        title: body.title,
        description: body.description,
        createdBy: body.loggedInUserId,
      }

      if (fileDetails) postCreate['files'] = fileDetails

      if (body.url) {
        metadata = await this.scrapeMetadata(body.url)
        if (metadata) postCreate['metadata'] = metadata
      }

      const result = await PostModel.create(postCreate)

      return {
        success: true,
        message: 'Post Created Successfully!',
        data: result,
      }
    } catch (err) {
      return { success: false, message: 'Post Creation Failed!', data: err }
    }
  }
  // Private method, do not use outside this class
  scrapeMetadata = async (url) => {
    try {
      const { data } = await axios.get(url)
      const $ = cheerio.load(data)
      const title = $('head title').text()
      const description = $('meta[name="description"]').attr('content')
      return { title, description }
    } catch (err) {
      logger.error(`${err}`)
      return null
    }
  }

  getPosts = async (blogId) => {
    const posts = await PostModel.find({ blogId })
    if (Helper.isEmpty(posts)) {
      return { success: false, message: 'no Posts found!!', data: null }
    } else {
      return { success: true, message: 'Posts found!!', data: posts }
    }
  }

  updatePosts = async (postId, body) => {
    const post = await PostModel.findByIdAndUpdate(postId, body, { new: true })
    if (post == null) {
      return { success: false, message: 'Post update failed!', data: null }
    } else {
      return { success: true, message: 'Post updated!!', data: post }
    }
  }

  findPost = async (postId) => {
    try {
      const post = await PostModel.findById(postId)
      if (post) return { success: true, message: 'Post found!!', data: post }
      else return { success: false, message: 'Post not found!!', data: null }
    } catch (err) {
      return { success: false, message: 'Post deletion failed!', data: null }
    }
  }

  deletePost = async (postId) => {
    try {
      await PostModel.findByIdAndDelete(postId)
      return { success: true, message: 'Post deleted!!', data: postId }
    } catch (err) {
      return { success: false, message: 'Post deletion failed!', data: null }
    }
  }
}

module.exports = PostService
