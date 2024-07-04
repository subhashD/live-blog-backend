const ApplicationError = require('./ApplicationError')

class ForbiddenError extends ApplicationError {
  constructor(message = null, status = 403) {
    super()

    Error.captureStackTrace(this, this.constructor)

    this.name = this.constructor.name

    this.status = status || 403

    this.message = message
  }
}

module.exports = ForbiddenError
