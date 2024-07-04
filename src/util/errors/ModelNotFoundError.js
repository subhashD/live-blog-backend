const ApplicationError = require('./ApplicationError')

class ModelNotFoundError extends ApplicationError {
  constructor(message = 'Data not found!', status = 404) {
    super(message)

    Error.captureStackTrace(this, this.constructor)

    this.name = this.constructor.name

    this.message = message

    this.status = status
  }
}

module.exports = ModelNotFoundError
