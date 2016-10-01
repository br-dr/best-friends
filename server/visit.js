'use strict';

var mongoose = require('mongoose');
var modelNames = require('./model-names');

var Schema = mongoose.Schema;

var visitSchema = new Schema({
    user: String,
    visitor: String,
}, {
    timestamps: true
});

module.exports = mongoose.model(modelNames.VISIT, visitSchema);
