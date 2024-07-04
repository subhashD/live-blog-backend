const passport = require('passport')
const configurator = require('./configurator')

const middlewares = (app) => {
  /**
   * Common Middlewares.
   */
  // Initialize passport
  require('../config/passport')
  app.use(passport.initialize())

  configurator.general(app)
  configurator.responses(app)

  return app
}

module.exports = middlewares
