const { Server } = require('socket.io')
const config = require('../config')

class SocketHandler {
  constructor(server) {
    if (SocketHandler.instance) {
      return SocketHandler.instance
    }

    this.io = new Server(server, {
      pingTimeout: 60000,
      cors: {
        origin: config.clientUrl,
        methods: ['GET', 'POST'],
      },
    })

    this.io.on('connection', (socket) => {
      console.log('New client connected:', socket.id)

      // Join blog room
      socket.on('joinBlog', (blogId) => {
        socket.join(blogId)
        console.log(`Client ${socket.id} joined blog ${blogId}`)
      })

      // Leave blog room
      socket.on('leaveBlog', (blogId) => {
        socket.leave(blogId)
        console.log(`Client ${socket.id} left blog ${blogId}`)
      })

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id)
      })
    })

    SocketHandler.instance = this
  }

  handlePostCreated(blogId, data) {
    console.log('Post created:', data)
    this.io.to(blogId).emit('postCreated', data)
  }

  handlePostUpdated(blogId, data) {
    console.log('Post updated:', data)
    this.io.to(blogId).emit('postUpdated', data)
  }

  handlePostDeleted(blogId, data) {
    console.log('Post deleted:', data)
    this.io.to(blogId).emit('postDeleted', data)
  }
}

module.exports = SocketHandler
