'use strict';

var mongoose = require('mongoose');
var modelNames = require('./model-names');

var Schema = mongoose.Schema;

var messageSchema = new Schema({
    content: String,
    poster: {
        type: Schema.Types.ObjectId,
        ref: modelNames.USER
    },
    conversation: {
        type: Schema.Types.ObjectId,
        ref: modelNames.CONVERSATION
    },
}, {
    timestamps: true
});

module.exports = mongoose.model(modelNames.MESSAGE, messageSchema);
