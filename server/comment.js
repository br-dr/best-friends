'use strict';

var mongoose = require('mongoose');
var modelNames = require('./model-names');

var Schema = mongoose.Schema;

var commentSchema = new Schema({
    content: String,
    creator: {
        type: Schema.Types.ObjectId, //id of poster
        ref: modelNames.USER
    },
    event: {
        type: Schema.Types.ObjectId, //event
        ref: modelNames.EVENT
    },
    likedBy: [{
        type: Schema.Types.ObjectId, //id of user who liked the comment
        ref: modelNames.USER
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model(modelNames.EVENT_COMMENT, commentSchema);
