'use strict';

var passport = require('passport');
var path = require('path');
var validUrl = require('valid-url');

var User = require('./user');
var Post = require('./post');
var app = require('./app');

app.get('/profile', ensureAuthenticated, function(req, res) {
    User.findById(req.session.passport.user, function(err, user) {
        if (err) {
            res.sendStatus(400);
        } else {
            res.json(user);
            // Post.find({}, function(err, posts) {
            //     if (err) return res.sendstatus(403);
            //     res.json({posts: posts, user: user});
            // });
        }
    });
});

app.get('/user/:id', ensureAuthenticated, function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (err) {
            res.sendStatus(404);
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
}), function(req, res) {
    res.redirect('/#/profile');
});

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

//search using regex
app.post('/searchUsers', ensureAuthenticated, function(req, res) {
    var searchData = req.body.searchText;

    User.find({ name: new RegExp(searchData, 'i') }, function(err, data) {
        if (err) {
            res.sendStatus(400);
        } else {
            res.json(data);
        }
    });
});

app.post('/follow', ensureAuthenticated, function(req, res) {
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

app.post('/unfollow', ensureAuthenticated, function(req, res) {
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

app.post('/api/add-post', ensureAuthenticated, (req, res) => {
    var newPost = new Post();

    newPost.heading = req.body.postTitle;
    newPost.content = req.body.postContent;
    newPost.creator = req.user._id;
    newPost.owner = req.user._id;

    newPost.save(function(err, post) {
        if (err) {
            return res.sendStatus(400);
        }

        var path = [{
            path: 'owner'
        }, {
            path: 'creator'
        }];

        Post.populate(post, path, function(err, populatedPost) {
            if (err) {
                return res.sendStatus(400);
            }

            res.json(populatedPost);
        });
    });
});

app.delete('/api/posts/:id', ensureAuthenticated, (req, res) => {
    if (!req.params.id) {
        return res.sendStatus(404);
    }

    Post.findOne({ _id: req.params.id }, function(err, post) {
        if (err) {
            return res.sendStatus(400);
        }

        if (post.owner === req.user._id || post.creator === req.user._id) {
            post.remove(function(err) {
                if (err) {
                    return res.sendStatus(400);
                }

                res.sendStatus(200);
            });
        } else {
            res.sendStatus(403);
        }
    });
});

app.get('/api/posts', ensureAuthenticated, (req, res) => {
    Post.find({ owner: req.user._id })
        .populate('owner')
        .populate('creator')
        .exec(function(err, posts) {
            if (err) {
                return res.sendstatus(403);
            }
            return res.json(posts);
        });
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.sendStatus(401);
}

app.all('/api/*', function(req, res) {
    res.sendStatus(404);
});

app.all('*', function(req, res) {
    res.sendfile(path
        .resolve(path.join(__dirname, '..', '/client/index.html'))
    );
});

module.exports = app;
