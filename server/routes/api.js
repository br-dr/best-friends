'use strict';

const express = require('express');
const profile = require('./profile');
const user = require('./user');
const users = require('./users');
const posts = require('./posts');
const events = require('./events');
const comments = require('./comments');
const conversations = require('./conversations');


const router = express.Router();

module.exports = router
    .use(ensureAuthenticated)
    .use('/profile', profile)
    .use('/user', user)
    .use('/users', users)
    .use('/posts', posts)
    .use('/events', events)
    .use('/comments', comments)
    .use('/conversations', conversations)
    .all('*', (req, res) => {
        res.sendStatus(404);
    });

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.sendStatus(401);
}
