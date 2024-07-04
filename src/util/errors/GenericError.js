const Helper = require('../helpers/helper')
const ApplicationError = require('./ApplicationError')

class GenericError extends ApplicationError {
  constructor(message, status = 400) {
    super()

    Error.captureStackTrace(this, this.constructor)

    this.name = this.constructor.name

    this.message = message

    this.status = status
  }
}

module.exports = GenericError
