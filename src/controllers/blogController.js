const BlogService = require('../services/blogService')
const BlogServiceInstance = new BlogService()

module.exports = {
  getBlogs: async (req, res) => {
    try {
      const response = await BlogServiceInstance.getBlogs()
      if (response.success) {
        return res.success(response.data, response.message, 200)
      }
      return res.error(response.data, response.message)
    } catch (error) {
      res.error(error, null, 500)
    }
  },

  createBlog: async (req, res) => {
    try {
      const response = await BlogServiceInstance.createBlog(req.body)
      if (response.success) {
        return res.success(response.data, response.message, 201)
      }
      return res.error(response.data, response.message)
    } catch (error) {
      res.error(error, null, 500)
    }
  },

  findBlog: async (req, res) => {
    try {
      const { id } = req.params
      const response = await BlogServiceInstance.findBlog(id)
      if (response.success) {
        return res.success(response.data, response.message, 200)
      }
      return res.error(response.data, response.message)
    } catch (error) {
      res.error(error, null, 500)
    }
  },

  deleteBlog: async (req, res) => {
    try {
      const { id } = req.params
      const response = await BlogServiceInstance.deleteBlog(id)
      if (response.success) {
        return res.success(null, response.message, 204)
      }
      return res.error(response.data, response.message)
    } catch (error) {
      res.error(error, null, 500)
    }
  },

  togglePublishBlog: async (req, res) => {
    try {
      const { id } = req.params
      const response = await BlogServiceInstance.togglePublishBlog(id)
      if (response.success) {
        return res.success(response.data, response.message, 200)
      }
      return res.error(response.data, response.message)
    } catch (error) {
      res.error(error, null, 500)
    }
  },
}
