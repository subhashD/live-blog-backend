const config = require('../config')
const blogController = require('../controllers/blogController')
const blogRequest = require('../requests/schema/blogRequest')
const prefix = 'blog'
let commonMiddleware = [
  'auth.jwt', // to check if token exists and is valid
]
// module.exports = router;
const editorRole = 'Editor'
const readerRole = 'Reader'

module.exports = {
  [`GET ${prefix}`]: {
    action: blogController.getBlogs,
    name: 'blog.all',
    middlewares: [...commonMiddleware, config.roles.bothRole],
  },

  [`POST ${prefix}`]: {
    action: blogController.createBlog,
    name: 'blog.create',
    middlewares: [...commonMiddleware, config.roles.editorRole],
    validator: blogRequest,
  },

  [`GET ${prefix}/:id`]: {
    action: blogController.findBlog,
    name: 'blog.find',
    middlewares: [...commonMiddleware, config.roles.bothRole],
  },

  [`DELETE ${prefix}/:id`]: {
    action: blogController.deleteBlog,
    name: 'blog.delete',
    middlewares: [...commonMiddleware, config.roles.editorRole],
  },

  [`PATCH ${prefix}/:id`]: {
    action: blogController.togglePublishBlog,
    name: 'blog.togglePublish',
    middlewares: [...commonMiddleware, config.roles.editorRole],
  },
}
