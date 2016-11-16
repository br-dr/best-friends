'use strict';

const express = require('express');
const router = express.Router();

const Post = require('./../post');

router
    .param('id', resolvePost)
    .post('/:id/like-post', likePost)
    .post('/:id/unlike-post', unlikePost)
    .delete('/:id', deletePost);

module.exports = router;

function resolvePost(req, res, next, id) {
    Post.findOne({ _id: id })
        .populate('owner')
        .populate('creator')
        .then((post) => {
            req.post = post;
            next();
        })
        .catch((err) => {
            next(err);
        });
}

function likePost(req, res) {
    req.post.likedBy.push(req.user._id);

    req.post.save()
        .then((post) => {
            return res.json(post);
        })
        .catch((err) => {
            res.sendStatus(403);
        });
}

function unlikePost(req, res) {
    const index = req.post.likedBy.indexOf(req.user._id);

    if (index > -1) {
        req.post.likedBy.splice(index, 1);
    }

    req.post.save()
        .then((post) => {
            return res.json(post);
        })
        .catch((err) => {
            res.sendStatus(403);
        });
}

function deletePost(req, res) {
    var isOwner = req.post.owner.equals(req.user._id);
    var isCreator = req.post.creator.equals(req.user._id);

    if (!(isOwner || isCreator)) {
        return res.sendStatus(403);
    }

    req.post.remove((err) => {
        if (err) {
            return res.sendStatus(400);
        }

        res.sendStatus(200);
    });
}
