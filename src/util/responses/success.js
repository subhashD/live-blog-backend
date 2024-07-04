const Helper = require('../helpers/helper')
module.exports = function (data = {}, message = null, statusCode = 200) {
  // Get access to `req` and `res`

  let res = this.res

  // If no data is provided, use res.sendStatus().

  if (Helper.isError(data)) {
    // If the error doesn't have a custom .toJSON(), use its `stack` instead--
    // otherwise res.json() would turn it into an empty dictionary.
    // (If this is production, don't send a response body at all.)
    if (!Helper.isFunction(data.toJSON)) {
      if (process.env.ENV === 'production') {
        return res.sendStatus(statusCode)
      } else {
        res.status(statusCode)
        return res.send(data.stack)
      }
    }
  }

  // Set status code and send response data.

  var responseData = {
    status: true,
    message: message,
  }

  if (!Helper.isEmpty(data)) {
    responseData.data = data
  }

  res.status(statusCode)
  return res.json(responseData)
}
