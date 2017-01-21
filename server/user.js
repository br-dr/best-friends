var mongoose = require('mongoose');
var modelNames = require('./model-names');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    oauthID: String,
    name: String,
    created: Date,
    firstName: String,
    lastName: String,
    following: [{
        type: Schema.Types.ObjectId,
        ref: modelNames.USER
    }],
    avatar: String,
    posts: [{
        type: Schema.Types.ObjectId,
        ref: modelNames.POST
    }]
});

userSchema.statics.findFollowers = function findFollowers(id) {
    return this.find({ following: id });
};

module.exports = mongoose.model(modelNames.USER, userSchema);
