'use strict';

const path = require('path');
const express = require('express');

const auth = require('./auth');
const api = require('./api');

module.exports = express.Router()
    .use('/auth', auth)
    .get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    })
    .use('/api', api)
    .all('*', (req, res) => {
        res.sendfile(path.join(__dirname, '..', '..', 'public/index.html'));
        // res.sendfile(path.join(__dirname, '..', '..', 'client/index.html'));
    });
