'use strict';

var mongoose = require('mongoose');
var modelNames = require('./model-names');

var Schema = mongoose.Schema;

var postSchema = new Schema({
    heading: String,
    content: String,
    creator: {
        type: Schema.Types.ObjectId, //id of poster
        ref: modelNames.USER
    },
    owner: {
        type: Schema.Types.ObjectId, //id of postwall owner
        ref: modelNames.USER
    }
}, {
    timestamps: true
});

module.exports = mongoose.model(modelNames.POST, postSchema);
