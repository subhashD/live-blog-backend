const config = require('../config')
const postController = require('../controllers/postController')
const postRequest = require('../requests/schema/postRequest')
const prefix = 'blog/:blogId/posts'
let commonMiddleware = [
  'auth.jwt', // to check if token exists and is valid
]

module.exports = {
  [`GET ${prefix}`]: {
    action: postController.getPosts,
    name: 'posts.all',
    middlewares: [...commonMiddleware, config.roles.bothRole],
  },

  [`POST ${prefix}`]: {
    action: postController.createPost,
    name: 'posts.create',
    middlewares: [
      ...commonMiddleware,
      `fileUpload:${config.storageEngine}|${config.maxFileSize}`,
      config.roles.editorRole,
    ],
    validator: postRequest,
  },

  [`GET ${prefix}/:postId`]: {
    action: postController.findPost,
    name: 'posts.find',
    middlewares: [...commonMiddleware, config.roles.bothRole],
  },

  [`DELETE ${prefix}/:postId`]: {
    action: postController.deletePost,
    name: 'posts.delete',
    middlewares: [...commonMiddleware, config.roles.editorRole],
  },

  [`PUT ${prefix}/:postId`]: {
    action: postController.updatePost,
    name: 'posts.update',
    middlewares: [...commonMiddleware, config.roles.editorRole],
    validator: postRequest,
  },
}
