const GenericError = require('./GenericError')
const ForbiddenError = require('./ForbiddenError')
const ValidationError = require('./ValidationError')
const UnauthorizedError = require('./UnauthorizedError')
const ModelNotFoundError = require('./ModelNotFoundError')
const InvalidSecretError = require('./InvalidSecretError')
const NotFoundError = require('./NotFoundError')
const logger = require('../logger/logger')

module.exports = function (err, req, res, next) {
  // use logger here
  logger.error(`${err}`)
  switch (err.constructor) {
    case InvalidSecretError:
      return res.error(err, err.message, err.status)

    case UnauthorizedError:
      return res.error(err, err.message, err.status)

    case ValidationError:
      return res.error(err, err.message, err.status)

    case GenericError:
      return res.error(err, err.message, err.status)

    case ModelNotFoundError:
      return res.error(err, err.message, err.status)

    case ForbiddenError:
      return res.error(err, err.message, err.status)

    case NotFoundError:
      return res.error(err, err.message, err.status)

    default:
      logger.error(`${err}`)
      return res.error(err, err.message, 500)
  }
}
