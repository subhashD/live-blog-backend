const ApplicationError = require('./ApplicationError')

class NotFoundError extends ApplicationError {
  constructor(
    message = 'Unable to find the requested resource!',
    status = 404
  ) {
    super(message)

    Error.captureStackTrace(this, this.constructor)

    this.name = this.constructor.name

    this.message = message

    this.status = status
  }
}

module.exports = NotFoundError
