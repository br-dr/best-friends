var GoogleStrategy = require('passport-google-oauth2').Strategy;

var port = require('./port');
var User = require('./user');

var Strategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_AUTH_CALLBACK_URL ||
    'http://localhost:' + port + '/auth/google/callback'
}, function(accessToken, refreshToken, profile, done) {
    User.findOne({ oauthID: profile.id })
        .exec()
        .then((user) => {
            return user || User.create({
                oauthID: profile.id,
                name: profile.displayName,
                created: Date.now(),
                following: []
            });
        })
        .then((user) => {
            done(null, user);
        })
        .catch((err) => {
            console.log(err);
            done(err);
        });
});

module.exports = {
    Strategy: Strategy,
    serializeUser: function(user, done) {
        done(null, user._id);
    },
    deserializeUser: function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    }
};
