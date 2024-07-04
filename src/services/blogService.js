const BlogModel = require('../models/blog') // Database Access
const Helper = require('../util/helpers/helper')

class BlogService {
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
  createBlog = async (body) => {
    try {
      const result = await BlogModel.create({
        name: body.name,
        createdBy: body.loggedInUserId,
      })

      return {
        success: true,
        message: 'Blog Created Successfully!',
        data: result,
      }
    } catch (err) {
      return { success: false, message: 'Blog Creation Failed!', data: err }
    }
  }

  getBlogs = async () => {
    const blogs = await BlogModel.find()
    if (Helper.isEmpty(blogs)) {
      return { success: false, message: 'no Blogs found!!', data: null }
    } else {
      return { success: true, message: 'Blogs found!!', data: blogs }
    }
  }

  findBlog = async (id) => {
    try {
      const blog = await BlogModel.findById(id)
      if (blog) return { success: true, message: 'Blog fetched!!', data: blog }
      else return { success: false, message: 'Blog not found!!', data: null }
    } catch (err) {
      return { success: false, message: 'Blog deletion failed!', data: null }
    }
  }

  deleteBlog = async (id) => {
    try {
      await BlogModel.findByIdAndDelete(id)
      return { success: true, message: 'Blog deleted!!', data: null }
    } catch (err) {
      return { success: false, message: 'Blog deletion failed!', data: null }
    }
  }

  togglePublishBlog = async (id) => {
    const blog = await BlogModel.findById(id)
    if (blog == null) {
      return { success: false, message: 'no Blogs found!!', data: null }
    } else {
      const isPublish = !blog.isPublished
      blog.isPublished = isPublish
      await blog.save()
      return {
        success: true,
        message: `Blog ${isPublish ? 'Published' : 'Unpublished'}!`,
        data: blog,
      }
    }
  }
}

module.exports = BlogService
