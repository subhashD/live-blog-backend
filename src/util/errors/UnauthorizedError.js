const ApplicationError = require('./ApplicationError')

class UnauthorizedError extends ApplicationError {
  constructor(message = null, status = 401) {
    super()

    Error.captureStackTrace(this, this.constructor)

    this.name = this.constructor.name

    this.message = message || 'Unauthorized!'

    this.status = status
  }
}

module.exports = UnauthorizedError
