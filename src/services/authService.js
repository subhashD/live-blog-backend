const config = require('../config/index')
const UserModel = require('../models/user') // Database Access
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const logger = require('../util/logger/logger')

class AuthService {
  /**
   * @description Create an instance of AuthService
   */
  constructor() {
    // Create instances here
  }

  generateToken = (payload, secret, life) => {
    //create the access token with the shorter lifespan
    let accessToken = jwt.sign(payload, secret, {
      algorithm: config.jwtAlgorithm,
      expiresIn: life,
    })
    return accessToken
  }

  isPasswordValid = async (user, password) => {
    const validPassword = await bcrypt.compare(password, user.password)
    return validPassword
  }

  generateAccessToken = async (user) => {
    const payload = {
      email: user.email,
    }

    //create the access token with the shorter lifespan
    return this.generateToken(
      payload,
      config.accessTokenSecret,
      config.accessTokenLife
    )
  }

  generateRefreshToken = async (user) => {
    const payload = {
      email: user.email,
    }

    //create the refresh token with the longer lifespan
    return this.generateToken(
      payload,
      config.refreshTokenSecret,
      config.refreshTokenLife
    )
  }

  /**
   * @description Attempt to create a user with the provided object
   * @param body {object} Object containing all body fields to
   * register user
   * @returns {Promise<{success: boolean, message: *, data: *}>}
   */
  register = async (body) => {
    try {
      const result = await UserModel.create({
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email,
        password: body.password,
        role: 'Reader',
      })

      return {
        success: true,
        message: 'User Created Successfully!',
        data: result,
      }
    } catch (err) {
      logger.error(`${err}`)
      return {
        success: false,
        message: 'User Creation Failed!',
        data: err.message,
      }
    }
  }

  login = async (body) => {
    const user = await UserModel.findOne({ email: body.email })
    if (user == null) {
      return { success: false, message: 'User not found!!', data: null }
    } else {
      // check if password matches
      const validPassword = await this.isPasswordValid(user, body.password)
      if (!validPassword) {
        return {
          success: false,
          message: 'Authentication failed. Wrong password.',
        }
      }

      let data = {}

      data.user = user
      data.accessToken = await this.generateAccessToken(user)
      data.refreshToken = await this.generateRefreshToken(user)

      return {
        success: true,
        message: 'User logged In successfully!!',
        data: data,
      }
    }
  }

  findUserByEmail = async (email) => {
    const user = await UserModel.findOne({ email: email })
    if (user == null) {
      return { success: false, message: 'User not found!!', data: null }
    } else {
      return { success: true, message: 'User found!!', data: user }
    }
  }

  refreshToken = async (body) => {
    let decoded = null
    try {
      decoded = jwt.verify(body.refreshToken, config.refreshTokenSecret)
    } catch (err) {
      if (err.name == 'TokenExpiredError') {
        return {
          success: false,
          message: 'Refresh Token Expired!!',
          data: err.message,
        }
      }
    }

    const user = await UserModel.findOne({ email: decoded.email })
    if (user == null) {
      return { success: false, message: 'User not found!!', data: null }
    } else {
      let tokens = {}

      tokens.accessToken = await this.generateAccessToken(user)
      tokens.refreshToken = await this.generateRefreshToken(user)

      return {
        success: true,
        message: 'Token refreshed successfully!!',
        data: tokens,
      }
    }
  }
}

module.exports = AuthService
