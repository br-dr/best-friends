const express = require('express');
const validUrl = require('valid-url');
const User = require('./../user');
const Visit = require('./../visit');
const Post = require('./../post');

const router = express.Router();

module.exports = router
    .get('', getProfile)
    .get('/followers', getFollowers)
    .get('/visit-stats/:period/', getVisitStatsByPeriod)
    .get('/posts', getPosts)
    .post('/change-avatar', changeAvatar);

function getProfile(req, res) {
    res.json(req.user);
}

function getFollowers(req, res) {
    User.findFollowers(req.user._id)
        .then((followers) => {
            return res.json(followers);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
}

function changeAvatar(req, res) {
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
}

function getVisitStatsByPeriod(req, res) {
    const {periodStart, howToGroup} = getGroupingAndPeriod(req.params.period);
    const aggregations = getAggregations(req.user._id, periodStart, howToGroup);

    Visit.aggregate(aggregations)
        .then((visits) => {
            return res.json(visits);
        })
        .catch((err) => {
            return res.status(400).json(err);
        });
}

function getGroupingAndPeriod(periodType) {
    let periodStart = new Date();
    let howToGroup = {};

    switch (periodType) {
        case 'day':
            periodStart.setHours(0, 0, 0, 0);
            howToGroup = { $hour: '$createdAt' };
            break;
        case 'week':
            howToGroup = { $dayOfWeek: '$createdAt' };
            if ((new Date().getDay()) === 0) {
                periodStart = new Date(
                    new Date() - 6 * 24 * 60 * 60 * 1000
                );
                periodStart.setHours(0, 0, 0, 0);
                break;
            }
            periodStart = new Date(
                new Date() -
                (new Date().getDay() - 1) * 24 * 60 * 60 * 1000
            );
            periodStart.setHours(0, 0, 0, 0);
            break;
        case 'month':
            periodStart.setHours(0, 0, 0, 0);
            periodStart.setDate(1);
            howToGroup = { $dayOfMonth: '$createdAt' };
            break;
    }

    return { periodStart, howToGroup };
}

function getAggregations(userId, periodStart, howToGroup) {
    return [
        {
            $match: {
                user: userId,
                visitor: { $ne: userId },
                createdAt: { $gt: periodStart }
            }
        }, {
            $group: {
                _id: howToGroup,
                count: { $sum: 1 },
                visitors: { $addToSet: '$visitor' }
            }
        }, {
            $sort: { _id: 1 }
        }
    ];
}

function getPosts(req, res) {
    Post.find({ owner: req.user._id })
        .populate('owner')
        .populate('creator')
        .exec((err, posts) => {
            if (err) {
                return res.sendstatus(403);
            }
            return res.json(posts);
        });
}
