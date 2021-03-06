var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/user');

module.exports = function(passport) {
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK
    },
    function(accessToken, refreshToken, profile, done)  {
      User.findOne({ 'googleId': profile.id }, function(err, user) {
        if (err) return done(err);
        if (user) {
            return done(null, user);
        } else {
          // we have a new user via OAuth!
          var newUser = new User({
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            profileImageUrl: profile.picture,
            googleId: profile.id
          });
          newUser.save(function(err) {
            if (err) return done(err);
            return done(null, newUser);
          });
        }
      });
  }));

  passport.serializeUser(function(user, done) {
      done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
}
