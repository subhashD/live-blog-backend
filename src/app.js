// src/app.js
const express = require('express')
const routes = require('./routes')
const config = require('./config')
const mongoose = require('mongoose')
const middlewares = require('./middleware')
const logger = require('../src/util/logger/logger')
const ErrorHandler = require('../src/util/errors/ErrorHandler')

const app = express()

async function connectToDB() {
  try {
    await mongoose.connect(config.dbUrl)
    logger.info(`MongoDB connected to ${config.dbUrl}`)
  } catch (err) {
    logger.error(`Failed to connect to MongoDB: ${err}`)
    throw err // Rethrow the error to handle it elsewhere if needed
  }
}

// Immediately invoke the async function to start connecting to MongoDB
connectToDB().catch((err) => {
  // Handle any initialization errors
  console.error(`Failed to initialize application: ${err}`)
  process.exit(1) // Exit the process with a non-zero code on failure
})

//pass app to middlewares
middlewares(app)

//pass app to routes
app.use(config.api.prefix, routes())
// handle 404 errors here
app.use(function (req, res, next) {
  res.error([], 'Unable to find the requested resource!', 404)
})

// Handling Errors (Global Handler)
app.use(ErrorHandler)

module.exports = app
