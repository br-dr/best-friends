'use strict';

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const passportConfig = require('./passport-config');
const routes = require('./routes');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'client'))); //or public
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
app.use(passport.initialize());
app.use(passport.session());

passport.use(passportConfig.Strategy);
passport.serializeUser(passportConfig.serializeUser);
passport.deserializeUser(passportConfig.deserializeUser);

app.use(routes);

module.exports = app;
