var mongoose = require('mongoose');
var modelNames = require('./model-names');

var Schema = mongoose.Schema;

var conversationSchema = new Schema({
    title: String,
    creator: {
        type: Schema.Types.ObjectId,
        ref: modelNames.USER
    },
    conversationParticipants: [{
        type: Schema.Types.ObjectId,
        ref: modelNames.USER
    }],
}, {
    timestamps: true
});

module.exports = mongoose.model(modelNames.CONVERSATION, conversationSchema);
