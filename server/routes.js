'use strict';

var passport = require('passport');
var path = require('path');
var validUrl = require('valid-url');

var User = require('./user');
var app = require('./app');

app.get('/profile', ensureAuthenticated, function (req, res) {
    User.findById(req.session.passport.user, function (err, user) {
        if (err) {
            res.sendStatus(400);
        } else {
            res.json(user);
        }
    });
});

app.get('/auth/google', passport.authenticate('google', {
    scope: [
        'https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/plus.profile.emails.read'
    ]
}));

app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/'
}), function (req, res) {
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
            res.status(500);
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
            res.sendStatus(500);
        });
});

app.post('/api/change-avatar', ensureAuthenticated, (req, res) => {
    if (validUrl.isUri(req.body.url)) {
        req.user.avatar = req.body.url;

        req.user.save()
            .then((user) => {
                res.json(user);
            }).catch(() => {
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(400);
    }
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.sendStatus(401);
}

app.all('/api/*', function (req, res) {
    res.sendStatus(404);
});

app.all('*', function (req, res) {
    res.sendfile(path.resolve(__dirname + '/../client/index.html'));
});

module.exports = app;
