'use strict';

var mongoose = require('mongoose');
var modelNames = require('./model-names');

var Schema = mongoose.Schema;

var eventSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: modelNames.USER
    },
    title: String,
    description: String,
    place: String,
    date: Date,
    time: Date
}, { timestamps: true });

module.exports = mongoose.model(modelNames.EVENT, eventSchema);
