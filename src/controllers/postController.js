const { server } = require('../server')
const PostService = require('../services/postService')
const PostServiceInstance = new PostService()
const SocketHandler = require('../sockets')
const socketHandler = new SocketHandler(server)

module.exports = {
  getPosts: async (req, res) => {
    try {
      const { blogId } = req.params
      const response = await PostServiceInstance.getPosts(blogId)
      if (response.success) {
        return res.success(response.data, response.message, 200)
      }
      return res.error(response.data, response.message)
    } catch (error) {
      res.error(error, null, 500)
    }
  },

  createPost: async (req, res) => {
    try {
      const { blogId } = req.params

      const response = await PostServiceInstance.createPost(
        blogId,
        req.body,
        req.files
      )
      if (response.success) {
        socketHandler.handlePostCreated(blogId, response.data)
        return res.success(response.data, response.message, 201)
      }
      return res.error(response.data, response.message)
    } catch (error) {
      res.error(error, null, 500)
    }
  },

  findPost: async (req, res) => {
    try {
      const { postId } = req.params
      const response = await PostServiceInstance.findPost(postId)
      if (response.success) {
        return res.success(response.data, response.message, 200)
      }
      return res.error(response.data, response.message)
    } catch (error) {
      res.error(error, null, 500)
    }
  },

  deletePost: async (req, res) => {
    try {
      const { blogId, postId } = req.params
      const response = await PostServiceInstance.deletePost(postId)
      if (response.success) {
        socketHandler.handlePostDeleted(blogId, response.data) // Emit event
        return res.success(null, response.message, 204)
      }
      return res.error(response.data, response.message)
    } catch (error) {
      res.error(error, null, 500)
    }
  },

  updatePost: async (req, res) => {
    try {
      const { blogId, postId } = req.params
      const response = await PostServiceInstance.updatePosts(postId, req.body)
      if (response.success) {
        socketHandler.handlePostUpdated(blogId, response.data) // Emit event
        return res.success(response.data, response.message, 200)
      }
      return res.error(response.data, response.message)
    } catch (error) {
      res.error(error, null, 500)
    }
  },
}
