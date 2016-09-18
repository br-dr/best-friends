'use strict';

var mongoose = require('mongoose');
var modelNames = require('./model-names');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    oauthID: String,
    name: String,
    created: Date,
    firstName: String,
    lastName: String,
    follows: Array,
    avatar: String,
    posts: [{ type: Schema.Types.ObjectId, ref: modelNames.POST }]
});

module.exports = mongoose.model(modelNames.USER, userSchema);
