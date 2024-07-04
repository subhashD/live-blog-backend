const SuccessResponse = require('./success')
const ErrorResponse = require('./error')

/**
 * Custom responses
 *
 * res.success();
 * res.error();
 */
module.exports = function () {
  return {
    success: SuccessResponse.bind(this),
    error: ErrorResponse.bind(this),
  }
}
