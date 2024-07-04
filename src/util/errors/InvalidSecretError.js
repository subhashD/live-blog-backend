const ApplicationError = require('./ApplicationError')

class InvalidSecretError extends ApplicationError {
  constructor(message = null, status = 400) {
    super()

    Error.captureStackTrace(this, this.constructor)

    this.name = this.constructor.name

    this.message = message || 'Invalid or no secret key found in header!'

    this.status = status
  }
}

module.exports = InvalidSecretError
