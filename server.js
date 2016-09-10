var express = require('express');
var dotenv = require('dotenv');
dotenv.config();
var app = express();
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
// var multiparty = require('connect-multiparty');
// var multipartyMiddleware = multiparty();
// app.use(multipartyMiddleware);
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

var fs = require('fs-extra');
var path = require('path');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/best_friends_db');

app.use(express.static(__dirname + '/client'));
app.use('/uploads', express.static(__dirname + '/uploads'));

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
    avatar: String,
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

//search using regex
app.post('/searchUsers', ensureAuthenticated, function (req, res) {

  var searchData = req.body.searchText;

    User.find({ name: new RegExp(searchData, 'i') }, function (err, data) {
      if (err) {
        console.log("SOMETHING IS WRONG");
      } else {
        console.log("found!");
        res.json(data);
      }
    });
  });

//upload avatar

// app.post('/api/user/uploads', multipartyMiddleware, function(req, res){
//      // We are able to access req.files.file thanks to 
//     // the multiparty middleware
//     var file = req.files.file;
//     console.log(file.name);
//     console.log(file.type);
// })
// app.post('/api/profile/editAvatar', multipartyMiddleware, function (req, res){
  
//     var file = req.files.file;

//     console.log(file.name);
//     console.log(file.type);
// })

app.post('/api/profile/editAvatar', ensureAuthenticated, upload.single('file'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  if (req.file) {
    console.log(req.file);
    
    req.user.avatar = req.file.destination + req.file.filename;
    req.user.save();
    return res.sendStatus(200);  
    
  }
  console.log('Missing file');
  res.sendStatus(500);
})



// test authentication
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { 
    console.log ('user is authenticated!!');
    return next();
   }
  res.status(401).send();
}

// app.all('api/*', function(req, res){
//   res.status(404).send();
// });

app.all('*', function(req, res){
  if(req.path.indexOf('api') !== -1){ 
   return res.status(404).send()
  }    
    res.sendfile(__dirname + '/client/index.html')  
});

app.listen(port, function () {
  console.log('Example app listening ' + port);
});


