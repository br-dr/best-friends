'use strict';

var passport = require('passport');
var path = require('path');
var validUrl = require('valid-url');

var User = require('./user');
var Post = require('./post');
var Visit = require('./visit');
var app = require('./app');

app.get('/profile', ensureAuthenticated, (req, res) => {
    res.json(req.user);
});

app.get('/api/profile/followers', ensureAuthenticated, (req, res) => {
    User.findFollowers(req.user._id)
        .then((followers) => {
            return res.json(followers);
        })
        .catch((err) => {
            res.status(400).json(err);
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

app.post('/api/user/:id/visit', ensureAuthenticated, (req, res) => {
    var newVisit = new Visit();

    newVisit.user = req.params.id;
    newVisit.visitor = req.user._id;
    newVisit.save()
        .then((visit) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            return res.sendStatus(400);
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
    res.redirect('/');
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
    req.user.following = req.user.following || [];
    req.user.following.push(req.body._id);

    req.user.following = req.user.following.reduce((arr, id) => {
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
    var index = req.user.following.indexOf(req.body._id);

    if (index > -1) {
        req.user.following.splice(index, 1);
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
    newPost.likedBy = [];

    var creatorId = req.user._id;

    User.findOne({ _id: req.params.id })
        .then((owner) => {
            if (owner._id.equals(creatorId)) {
                return;
            }

            if (owner.following.indexOf(creatorId) !== -1) {
                return;
            }

            return Promise.reject();
        })
        .then(() => {
            return newPost.save();
        })
        .then((post) => {
            var path = [{ path: 'owner' }, { path: 'creator' }];

            return Post.populate(post, path);
        })
        .then((populatedPost) => {
            return res.json(populatedPost);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

app.post('/api/posts/:id/like-post', ensureAuthenticated, (req, res) => {
    Post.findOne({ _id: req.params.id })
        .populate('owner')
        .populate('creator')
        .then((populatedPost) => {
            populatedPost.likedBy.push(req.user._id);
            return populatedPost.save();
        })
        .then((post) => {
            return res.json(post);
        })
        .catch((err) => {
            res.sendStatus(403);
        });
});

app.post('/api/posts/:id/unlike-post', ensureAuthenticated, (req, res) => {
    var id = req.params.id;

    Post.findOne({ _id: id })
        .populate('owner')
        .populate('creator')
        .then((populatedPost) => {
            var index = populatedPost.likedBy.indexOf(req.user._id);

            if (index > -1) {
                populatedPost.likedBy.splice(index, 1);
            }

            return populatedPost.save();
        })
        .then((post) => {
            return res.json(post);
        })
        .catch((err) => {
            res.sendStatus(403);
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

app.get('/api/user/:id/followers', ensureAuthenticated, (req, res) => {
    var id = req.params.id;

    User.findFollowers(id)
        .then((followers) => {
            return res.json(followers);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

app.get('/api/user/:id/following-list', ensureAuthenticated, (req, res) => {
    var id = req.params.id;

    User.findOne({ _id: id })
        .populate('following')
        .then((populatedUser) => {
            return res.json(populatedUser.following);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

app.get('/api/user/:id/followers-list', ensureAuthenticated, (req, res) => {
    var id = req.params.id;

    User.findFollowers(id)
        .then((followers) => {
            return res.json(followers);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

app.get('/api/profile/total-visits', ensureAuthenticated, (req, res) => {
    Visit.find({
        user: req.user._id,
        visitor: { $ne: req.user._id }
    })
        .then((visits) => {
            return res.json(visits.length);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

app.get('/api/profile/unique-visits', ensureAuthenticated, (req, res) => {
    Visit.find({
        user: req.user._id,
        visitor: { $ne: req.user._id }
    })
        .then((visits) => {
            return removeDuplicates(visits, 'visitor');
        })
        .then((uniqueVisits) => {
            res.json(uniqueVisits.length);
        })
        .catch((err) => {
            res.status(400).json();
        });
});

app.get('/api/profile/total-visits-day', ensureAuthenticated, (req, res) => {
    var start = new Date();

    start.setHours(0, 0, 0, 0);

    Visit.find({
        user: req.user._id,
        visitor: { $ne: req.user._id },
        createdAt: { $gt: start }
    })
        .then((visits) => {
            return res.json(visits.length);
        })
        .catch((err) => {
            return res.status(400).json(err);
        });
});

app.get('/api/profile/total-visits-week', ensureAuthenticated, (req, res) => {
    var weekStart = new Date();

    weekStart.setHours(0, 0, 0, 0);

    for (var i = 1; i < 7; i++) {
        if (weekStart.getDay() !== 1) {
            weekStart = weekStart - i * 24 * 60 * 60 * 1000;
        }
        break;
    }

    Visit.find({
        user: req.user._id,
        visitor: { $ne: req.user._id },
        createdAt: { $gt: weekStart }
    })
        .then((visits) => {
            return res.json(visits.length);
        })
        .catch((err) => {
            return res.status(400).json(err);
        });
});

app.get('/api/profile/total-visits-month', ensureAuthenticated, (req, res) => {
    var monthStart = new Date();

    monthStart.setHours(0, 0, 0, 0);
    monthStart.setDate(1);

    Visit.find({
        user: req.user._id,
        visitor: { $ne: req.user._id },
        createdAt: { $gt: monthStart }
    })
        .then((visits) => {
            return res.json(visits.length);
        })
        .catch((err) => {
            return res.status(400).json(err);
        });
});

app.get('/api/profile/unique-visits-day', ensureAuthenticated, (req, res) => {
    var start = new Date();

    start.setHours(0, 0, 0, 0);

    Visit.find({
        user: req.user._id,
        visitor: { $ne: req.user._id },
        createdAt: { $gt: start }
    })
        .then((visits) => {
            return removeDuplicates(visits, 'visitor');
        })
        .then((uniqueVisits) => {
            res.json(uniqueVisits.length);
        })
        .catch((err) => {
            res.status(400).json();
        });
});

app.get('/api/profile/unique-visits-week', ensureAuthenticated, (req, res) => {
    var weekStart = new Date();

    weekStart.setHours(0, 0, 0, 0);

    for (var i = 1; i < 7; i++) {
        if (weekStart.getDay() !== 1) {
            weekStart = weekStart - i * 24 * 60 * 60 * 1000;
        }
        break;
    }

    Visit.find({
        user: req.user._id,
        visitor: { $ne: req.user._id },
        createdAt: { $gt: weekStart }
    })
        .then((visits) => {
            return removeDuplicates(visits, 'visitor');
        })
        .then((uniqueVisits) => {
            res.json(uniqueVisits.length);
        })
        .catch((err) => {
            res.status(400).json();
        });
});

app.get('/api/profile/unique-visits-month', ensureAuthenticated, (req, res) => {
    var monthStart = new Date();

    monthStart.setHours(0, 0, 0, 0);
    monthStart.setDate(1);

    Visit.find({
        user: req.user._id,
        visitor: { $ne: req.user._id },
        createdAt: { $gt: monthStart }
    })
        .then((visits) => {
            return removeDuplicates(visits, 'visitor');
        })
        .then((uniqueVisits) => {
            res.json(uniqueVisits.length);
        })
        .catch((err) => {
            res.status(400).json();
        });
});

app.get('/api/profile/visit-stats/:period/:totalOrUnique', ensureAuthenticated, (req, res) => {
    var periodStart = new Date();

    switch (req.params.period) {
        case 'day':
            periodStart.setHours(0, 0, 0, 0);
            break;
        case 'week':
            periodStart.setHours(0, 0, 0, 0);

            for (var i = 1; i < 7; i++) {
                if (periodStart.getDay() !== 1) {
                    periodStart = periodStart - i * 24 * 60 * 60 * 1000;
                }
                break;
            }
            break;
        case 'month':
            periodStart.setHours(0, 0, 0, 0);
            periodStart.setDate(1);
            break;
    }


    Visit.find({
        user: req.user._id,
        visitor: { $ne: req.user._id },
        createdAt: { $gt: periodStart }
    })
        .then((visits) => {
            if (req.params.totalOrUnique == 'total') {
                return visits;
            }
            return removeDuplicates(visits, 'visitor');
        })
        .then((visits) => {
            return res.json(visits);
        })
        .catch((err) => {
            return res.status(400).json(err);
        });
});

app.all('/api/*', (req, res) => {
    res.sendStatus(404);
});

app.all('*', (req, res) => {
    res.sendfile(path
        .resolve(path.join(__dirname, '..', '/client/index.html'))
    );
});

module.exports = app;

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.sendStatus(401);
}

function removeDuplicates(originalArray, objKey) {
    var uniqueVisits = [];
    var values = [];
    var value;

    for (var i = 0; i < originalArray.length; i++) {
        value = originalArray[i][objKey];

        if (values.indexOf(value) === -1) {
            uniqueVisits.push(originalArray[i]);
            values.push(value);
        }
    }
    return uniqueVisits;
}
