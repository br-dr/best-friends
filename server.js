var express = require('express');
var dotenv = require('dotenv');
dotenv.config();
var app = express();
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/best_friends_db');

app.use(express.static(__dirname + '/client'));

/*app.get('/', function (req, res) {
  res.send('Hello World!');
});*/

// var config = require('./oauth.js');

var passport = require('passport');
var cookieParser = require('cookie-parser');
app.use(cookieParser());
// app.use(express.cookieParser());
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var session = require('express-session');
app.use(session({secret:'mysecret'}))
app.use(passport.initialize())
app.use(passport.session()); 

var GoogleStrategy = require('passport-google-oauth2').Strategy;


// create a user model

var Schema = mongoose.Schema;

var userSchema = new Schema({
    oauthID: String,
    name: String,
    created: Date,
    firstName: String,
    lastName: String
});

var User = mongoose.model('User', userSchema);

// serialize and deserialize
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

// config

var GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
  callbackURL: process.env.GOOGLE_AUTH_CALLBACK_URL || "http://localhost:" + port + "/auth/google/callback" 
},
  function (accessToken, refreshToken, profile, done) {
    User.findOne({ oauthID: profile.id }, function (err, user) {
      if (err) {
        console.log(err);
      }
      if (!err && user !== null) {
        done(null, user);
      } else {
        user = new User({
          oauthID: profile.id,
          name: profile.displayName,
          created: Date.now()
        });
        user.save(function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log("saving user ...");
            done(null, user);
            console.log(user);
          }
        });
      }
    });
  }
));

//routes

  

app.get('/profile', ensureAuthenticated, function(req, res){
  User.findById(req.session.passport.user, function(err, user) {
    if(err) {
      console.log(err);  // handle errors
    } else {
      // res.render('profile', { user: user});
      // res.send(req.user);
      res.json(user)            
    }
  });
});

app.get('/auth/google',
  passport.authenticate('google', { scope: [
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read'
  ] }
));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/#/profile');
  });

  app.get('/logout', function(req, res){
  req.logout();
  console.log('logged out');
  res.redirect('/');
});


// test authentication
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { 
    console.log ('user is authenticated!!');
    return next();
   }
  res.redirect('/');
}

app.all('*', function(req, res){
  res.sendfile(___dirname + '/client/index.html')
});

app.listen(port, function () {
  console.log('Example app listening ' + port);
});


