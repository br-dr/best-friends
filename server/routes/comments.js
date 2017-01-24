const express = require('express');
const router = express.Router();

const Comment = require('./../comment');

router
    .param('id', resolveComment)
    .post('/:id/like-comment', likeComment)
    .post('/:id/unlike-comment', unlikeComment)
    .delete('/:id', deleteComment);

module.exports = router;

function resolveComment(req, res, next, id) {
    Comment.findOne({ _id: id })
        .populate('event')
        .populate('creator')
        .then((comment) => {
            req.comment = comment;
            next();
        })
        .catch((err) => {
            next(err);
        });
}

function likeComment(req, res) {
    req.comment.likedBy.push(req.user._id);

    req.comment.save()
        .then((comment) => {
            return res.json(comment);
        })
        .catch((err) => {
            res.sendStatus(403);
        });
}

function unlikeComment(req, res) {
    const index = req.comment.likedBy.indexOf(req.user._id);

    if (index > -1) {
        req.comment.likedBy.splice(index, 1);
    }

    req.comment.save()
        .then((comment) => {
            return res.json(comment);
        })
        .catch((err) => {
            res.sendStatus(403);
        });
}

function deleteComment(req, res) {
    var isCreator = req.comment.creator.equals(req.user._id);

    if (!isCreator) {
        return res.sendStatus(403);
    }

    req.comment.remove((err) => {
        if (err) {
            return res.sendStatus(400);
        }

        res.sendStatus(200);
    });
}
