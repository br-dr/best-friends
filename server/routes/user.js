'use strict';

const express = require('express');
const router = express.Router();
const User = require('./../user');
const Visit = require('./../visit');
const Post = require('./../post');
const Conversation = require('./../conversation');

module.exports = router
    .param('id', resolveTartgetUser)
    .get('/:id/', getTargetUser)
    .get('/:id/posts', getPosts)
    .get('/:id/following-list', getFollowingList)
    .get('/:id/followers-list', getFollowersList)
    .post('/:id/visit', addVisit)
    .post('/:id/follow', followUser)
    .post('/:id/unfollow', unfollowUser)
    .post('/:id/add-post', addPost);
    // .post('/:id/add-conversation', addConversation);

function resolveTartgetUser(req, res, next, id) {
    User.findById(id)
        .then((user) => {
            req.targetUser = user;
            next();
        })
        .catch((err) => {
            next(err);
        });
}

function getTargetUser(req, res) {
    return res.json(req.targetUser);
}

function addVisit(req, res) {
    var newVisit = new Visit();

    newVisit.user = req.targetUser._id;
    newVisit.visitor = req.user._id;
    newVisit.save()
        .then((visit) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            return res.sendStatus(400);
        });
}

function addPost(req, res) {
    var newPost = new Post();

    newPost.content = req.body.postContent;
    newPost.creator = req.user._id;
    newPost.owner = req.targetUser._id;
    newPost.likedBy = [];

    checkOwner(req.targetUser, req.user._id)
        .then(() => {
            return newPost.save();
        })
        .then((post) => {
            var path = [{ path: 'owner' }, { path: 'creator' }];

            return Post.populate(post, path);
        })
        .then((populatedPost) => {
            return res.json(populatedPost);
        })
        .catch((err) => {
            res.status(400).json(err);
        });

    function checkOwner(owner, creatorId) {
        return new Promise((resolve, reject) => {
            if (owner._id.equals(creatorId)) {
                return resolve();
            }

            if (owner.following.indexOf(creatorId) !== -1) {
                return resolve();
            }

            return reject();
        });
    }
}

function addConversation(req, res) {
    var newConversation = new Conversation();

    newConversation.content = req.body.conversationContent;
    newConversation.creator = req.user._id;
    newConversation.coversationParticipants = [];
    newConversation.coversationParticipants.push(req.user._id);

    newConversation.save()
        .then((conversation) => {
            var path = [{path: 'creator'}, {path: 'conversationParticipants'}];

            return Conversation.populate(conversation, path);
        })
        .then((populatedConversation) => {
            return res.json(populatedConversation);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
}
    // newPost.owner = req.targetUser._id;
    // newPost.likedBy = [];



    // checkOwner(req.targetUser, req.user._id)
    //     .then(() => {
    //         return newPost.save();
    //     })
    //     .then((post) => {
    //         var path = [{ path: 'owner' }, { path: 'creator' }];

    //         return Post.populate(post, path);
    //     })
    //     .then((populatedPost) => {
    //         return res.json(populatedPost);
    //     })
    //     .catch((err) => {
    //         res.status(400).json(err);
    //     });

    // function checkOwner(owner, creatorId) {
    //     return new Promise((resolve, reject) => {
    //         if (owner._id.equals(creatorId)) {
    //             return resolve();
    //         }

    //         if (owner.following.indexOf(creatorId) !== -1) {
    //             return resolve();
    //         }

    //         return reject();
    //     });
    // }


function getPosts(req, res) {
    Post.find({ owner: req.targetUser._id })
        .populate('owner')
        .populate('creator')
        .then((posts) => {
            return res.json(posts);
        })
        .catch((err) => {
            return res.sendstatus(403);
        });
}

function getFollowersList(req, res) {
    User.findFollowers(req.targetUser._id)
        .then((followers) => {
            return res.json(followers);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
}

function getFollowingList(req, res) {
    User.findOne({ _id: req.targetUser._id })
        .populate('following')
        .then((populatedUser) => {
            return res.json(populatedUser.following);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
}

function followUser(req, res) {
    req.user.following = req.user.following || [];
    req.user.following.push(req.targetUser._id);

    req.user.following = req.user.following.reduce((arr, id) => {
        if (arr.indexOf(id) === -1) {
            arr.push(id);
        }
        return arr;
    }, []);

    req.user.save()
        .then((user) => {
            res.json(user);
        }).catch(() => {
            res.status(500);
        });
}

function unfollowUser(req, res) {
    var index = req.user.following.indexOf(req.targetUser._id);

    if (index > -1) {
        req.user.following.splice(index, 1);
    }

    req.user.save()
        .then((user) => {
            res.json(user);
        }).catch(() => {
            res.sendStatus(500);
        });
}
