const AuthService = require('../services/authService')
const AuthServiceInstance = new AuthService()

module.exports = {
  register: async (req, res) => {
    try {
      const response = await AuthServiceInstance.register(req.body)
      if (response.success) {
        return res.success(response.data, response.message, 201)
      }
      return res.error(response.data, response.message)
    } catch (error) {
      res.error(error, null, 500)
    }
  },

  login: async (req, res) => {
    try {
      const response = await AuthServiceInstance.login(req.body)
      if (response.success) {
        return res.success(response.data, response.message, 200)
      }
      return res.error(response.data, response.message)
    } catch (error) {
      res.error(error, null, 500)
    }
  },

  refreshToken: async (req, res) => {
    try {
      const response = await AuthServiceInstance.refreshToken(req.body)
      if (response.success) {
        return res.success(response.data, response.message, 200)
      }
      return res.error(response.data, response.message)
    } catch (error) {
      res.error(error, null, 500)
    }
  },
}
