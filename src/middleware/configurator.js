const AuthMiddleware = require('./auth')
const GeneralMiddleware = require('./general')
const ResponseMacroMiddleware = require('./responses')
const fileUploadMiddleware = require('./fileUpload')

module.exports = {
  general: GeneralMiddleware,
  responses: ResponseMacroMiddleware,
  auth: {
    jwt: AuthMiddleware.jwt,
    checkRole: AuthMiddleware.checkRole,
  },
  fileUpload: fileUploadMiddleware.uploadMiddleware,
}
