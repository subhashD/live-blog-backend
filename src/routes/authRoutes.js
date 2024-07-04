const authController = require('../controllers/authController')
const registerRequest = require('../requests/schema/registerRequest')
const loginRequest = require('../requests/schema/loginRequest')
const prefix = 'auth'

// module.exports = router;

module.exports = {
  [`POST ${prefix}/register`]: {
    action: authController.register,
    name: 'auth.register',
    middlewares: [],
    validator: registerRequest,
  },

  [`POST ${prefix}/login`]: {
    action: authController.login,
    name: 'auth.login',
    middlewares: [],
    validator: loginRequest,
  },

  [`POST ${prefix}/refresh-token`]: {
    action: authController.refreshToken,
    name: 'auth.token',
    middlewares: ['auth.jwt'],
  },
}
