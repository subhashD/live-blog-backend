const passport = require('passport')

const checkRole = (roles) => (req, res, next) => {
  if (req.auth.user != null && !roles.includes(req.auth.user.role)) {
    return res.status(403).send({ status: false, message: 'Access denied.' })
  }

  next()
}

module.exports = {
  jwt: (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) {
        return next(err)
      }

      if (!user) {
        return res.status(401).send({ status: false, message: 'Unauthorized' })
      }

      req['auth'] = {
        isLoggedIn: true,
        user: user,
      }

      req.body.loggedInUserId = user._id.toString()

      return next()
    })(req, res, next) // Ensure the passport middleware is called with (req, res, next)
  },
  checkRole: checkRole,
}
