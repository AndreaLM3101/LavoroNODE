const passport = require('passport');

function authorize(req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    req.user = user;
    next();
  })(req, res, next);
}

module.exports = authorize;
