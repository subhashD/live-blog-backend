// src/server.js
const app = require('./app')
const config = require('./config')
const http = require('http')
const logger = require('../src/util/logger/logger')
const SocketHandler = require('./sockets')

const server = http.createServer(app)

;(async () => {
  try {
    const PORT = config.port || 3000
    // Initialize SocketHandler with server
    const socketHandler = new SocketHandler(server)

    server.listen(PORT, () => {
      console.log('Server listening on port 3000')
    })
  } catch (error) {
    console.error('error creating server:', error)
  }
})()

module.exports = {
  server: server,
}
