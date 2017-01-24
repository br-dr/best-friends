var mongoose = require('mongoose');
var modelNames = require('./model-names');

var Schema = mongoose.Schema;

var visitSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: modelNames.USER
    },
    visitor: {
        type: Schema.Types.ObjectId,
        ref: modelNames.USER
    },
}, {
    timestamps: true
});

module.exports = mongoose.model(modelNames.VISIT, visitSchema);
