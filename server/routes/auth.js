const express = require('express');
const passport = require('passport');

const router = express.Router();

module.exports = router
    .get('/google', passport.authenticate('google', {
        scope: [
            'https://www.googleapis.com/auth/plus.login',
            'https://www.googleapis.com/auth/plus.profile.emails.read'
        ]
    }))

    .get('/google/callback', passport.authenticate('google', {
        failureRedirect: '/'
    }), (req, res) => {
        res.redirect('/');
    });
