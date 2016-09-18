'use strict';

var passport = require('passport');
var path = require('path');
var validUrl = require('valid-url');

var User = require('./user');
var Post = require('./post');
var app = require('./app');

app.get('/profile', ensureAuthenticated, (req, res) => {
    User.findById(req.session.passport.user)
        .then((user) => {
            return res.json(user);
        })
        .catch((err) => {
            res.sendStatus(400);
        });
});

app.get('/user/:id', ensureAuthenticated, (req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            return res.json(user);
        })
        .catch((err) => {
            res.sendStatus(404);
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
}), (req, res) => {
    res.redirect('/#/profile');
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

app.post('/search-users', ensureAuthenticated, (req, res) => {
    var searchData = req.body.searchText;

    User.find({ name: new RegExp(searchData, 'i') }, (err, data) => {
        if (err) {
            return res.sendStatus(400);
        }

        res.json(data);
    });
});

app.post('/follow', ensureAuthenticated, (req, res) => {
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

app.post('/unfollow', ensureAuthenticated, (req, res) => {
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
    if (!validUrl.isUri(req.body.url)) {
        return res.sendStatus(400);
    }

    req.user.avatar = req.body.url;

    req.user.save()
        .then((user) => {
            res.json(user);
        }).catch(() => {
            res.sendStatus(500);
        });
});

app.post('/api/user/:id/add-post/', ensureAuthenticated, (req, res) => {
    var newPost = new Post();

    newPost.heading = req.body.postTitle;
    newPost.content = req.body.postContent;
    newPost.creator = req.user._id;
    newPost.owner = req.params.id;

    newPost.save()
        .then((post) => {
            var path = [{ path: 'owner' }, { path: 'creator' }];

            return Post.populate(post, path);
        })
        .then((populatedPost) => {
            return res.json(populatedPost);
        })
        .catch((err) => {
            res.sendStatus(400);
        });
});

app.delete('/api/posts/:id', ensureAuthenticated, (req, res) => {
    if (!req.params.id) {
        return res.sendStatus(404);
    }

    Post.findOne({ _id: req.params.id }, (err, post) => {
        if (err) {
            return res.sendStatus(400);
        }

        var isOwner = post.owner.equals(req.user._id);
        var isCreator = post.creator.equals(req.user._id);

        if (!(isOwner || isCreator)) {
            return res.sendStatus(403);
        }

        post.remove((err) => {
            if (err) {
                return res.sendStatus(400);
            }

            res.sendStatus(200);
        });
    });
});

app.get('/api/posts', ensureAuthenticated, (req, res) => {
    Post.find({ owner: req.user._id })
        .populate('owner')
        .populate('creator')
        .exec((err, posts) => {
            if (err) {
                return res.sendstatus(403);
            }
            return res.json(posts);
        });
});

app.get('/api/user/:id/posts', ensureAuthenticated, (req, res) => {
    var id = req.params.id;

    Post.find({ owner: id })
        .populate('owner')
        .populate('creator')
        .then((posts) => {
            return res.json(posts);
        })
        .catch((err) => {
            return res.sendstatus(403);
        });
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.sendStatus(401);
}

app.all('/api/*', (req, res) => {
    res.sendStatus(404);
});

app.all('*', (req, res) => {
    res.sendfile(path
        .resolve(path.join(__dirname, '..', '/client/index.html'))
    );
});

module.exports = app;
