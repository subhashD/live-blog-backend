const Helper = require('../util/helpers/helper')

module.exports = function (app) {
  app.use((req, res, next) => {
    req.allParams = { ...{}, ...req.query, ...req.body, ...req.params }
    req.getParam = function (paramName, defaultVal = null) {
      return Helper.getObjProp(req.allParams, paramName, defaultVal)
    }

    next()
  })
}
