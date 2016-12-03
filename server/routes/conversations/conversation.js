'use strict';

const express = require('express');
const router = express.Router();

const Conversation = require('./../../conversation');
const Message = require('./../../message');

router
    .param('id', resolveConversation)
    .get('/:id', getConversation)
    .get('/:id/messages', getMessages)
    .post('/:id/add-message', addMessage)


module.exports = router;

function resolveConversation(req, res, next, id) {
    Conversation.findOne({ _id: req.params.id })
        // .populate('creator')
        // .populate('creator')
        .then((data) => {
            req.conversation = data;
            next();
        })
        .catch((err) => {
            next(err);
        });
}

function getMessages(req, res) {
    Message.find({ conversation: req.conversation._id })
        .populate('conversation')
        .populate('poster')
        .then((messages) => {
            return res.json(messages);
        })
        .catch((err) => {
            return res.sendstatus(403);
        });
}

function getConversation(req, res) {
    res.json(req.conversation);
}

function addMessage(req, res) {
    var newMessage = new Message();

    newMessage.content = req.body.content;
    newMessage.poster = req.user._id;
    newMessage.conversation = req.conversation._id;

    newMessage.save()
        .then((message) => {
            var path = [{ path: 'conversation' }, { path: 'poster' }];

            return Message.populate(message, path);
        })
        .then((populatedMessage) => {
            return res.json(populatedMessage);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
}
