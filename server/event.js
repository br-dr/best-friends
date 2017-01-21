var mongoose = require('mongoose');
var modelNames = require('./model-names');

var Schema = mongoose.Schema;

var eventSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: modelNames.USER
    },
    invitedPersons: [{
        type: Schema.Types.ObjectId,
        ref: modelNames.USER
    }],
    accepted: [{
        type: Schema.Types.ObjectId,
        ref: modelNames.USER
    }],
    declined: [{
        type: Schema.Types.ObjectId,
        ref: modelNames.USER
    }],
    title: String,
    description: String,
    place: String,
    time: Date,
    isPrivate: Boolean
}, { timestamps: true });

module.exports = mongoose.model(modelNames.EVENT, eventSchema);
