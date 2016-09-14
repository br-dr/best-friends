'use strict';

var mongoose = require('mongoose');

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

module.exports = mongoose.model('User', userSchema);
