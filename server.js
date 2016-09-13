var dotenv = require('dotenv');
dotenv.config();

var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var MongoStore = require('connect-mongo')(session);
var validUrl = require('valid-url');

var port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/best_friends_db');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    oauthID: String,
    name: String,
    created: Date,
    firstName: String,
    lastName: String,
    follows: Array,
    avatar: String
});

var User = mongoose.model('User', userSchema);

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_AUTH_CALLBACK_URL || "http://localhost:" + port + "/auth/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        User.findOne({ oauthID: profile.id })
            .exec()
            .then((user) => {
                return user || User.create({
                    oauthID: profile.id,
                    name: profile.displayName,
                    created: Date.now(),
                    follows: []
                });
            })
            .then((user) => {
                done(null, user);
            })
            .catch((err) => {
                console.log(err);
                done(err);
            });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

var app = express();

app.use(express.static(__dirname + '/client'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret',
    maxAge: new Date(Date.now() + 3600000),
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));

app.use(passport.initialize())
app.use(passport.session());

//routes

app.get('/profile', ensureAuthenticated, function (req, res) {
    User.findById(req.session.passport.user, function (err, user) {
        if (err) {
            res.sendStatus(400);
        } else {
            res.json(user);
        }
    });
});

app.get('/auth/google',
    passport.authenticate('google', {
        scope: [
            'https://www.googleapis.com/auth/plus.login',
            'https://www.googleapis.com/auth/plus.profile.emails.read'
        ]
    }
    ));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    function (req, res) {
        res.redirect('/#/profile');
    });

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

//search using regex
app.post('/searchUsers', ensureAuthenticated, function (req, res) {

    var searchData = req.body.searchText;

    User.find({ name: new RegExp(searchData, 'i') }, function (err, data) {
        if (err) {
            res.sendStatus(400);
        } else {
            res.json(data);
        }
    });
});

app.post('/follow', ensureAuthenticated, function (req, res) {
    req.user.follows = req.user.follows || [];
    req.user.follows.push(req.body._id);

    req.user.follows = req.user.follows.reduce((arr, id) => {
        if (arr.indexOf(id) === -1) {
            arr.push(id);
        }
        return arr;
    }, []);

    req.user.save()
        .then((user) => {
            res.json(user);
        }).catch(() => {
            res.status(500).json(err);
        });
});

app.post('/unfollow', ensureAuthenticated, function (req, res) {
    var index = req.user.follows.indexOf(req.body._id);

    if (index > -1) {
        req.user.follows.splice(index, 1);
    }

    req.user.save()
        .then((user) => {
            res.json(user);
        }).catch(() => {
            res.status(500).json(err);
        });
});

app.post('/api/change-avatar', ensureAuthenticated, (req, res) => {
    if (validUrl.isUri(req.body.url)) {
        req.user.avatar = req.body.url;

        req.user.save()
            .then((user) => {
                res.json(user);
            }).catch(() => {
                res.status(500).json(err);
            });
    } else {
        res.sendStatus(400);
    }
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).send();
}

app.all('/api/*', function (req, res) {
    res.sendStatus(404);
});

app.all('*', function (req, res) {
    res.sendfile(__dirname + '/client/index.html')
});

app.listen(port, function () {
    console.log('Example app listening ' + port);
});
