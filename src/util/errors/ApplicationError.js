class ApplicationError extends Error {
  constructor(message = null, status = null) {
    super()

    this.message = 'Something went wrong. Please try again later!'

    this.status = 500

    Error.captureStackTrace(this, this.constructor)

    this.name = this.constructor.name

    this.message = message || this.message

    this.status = status || 500
  }
}

module.exports = ApplicationError
