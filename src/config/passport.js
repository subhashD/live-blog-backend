const passport = require('passport')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const User = require('../models/user')
const config = require('./index')

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.accessTokenSecret,
}

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findOne({ email: jwt_payload.email })
      if (user) {
        return done(null, user)
      }
      return done(null, false)
    } catch (error) {
      return done(error, false)
    }
  })
)
