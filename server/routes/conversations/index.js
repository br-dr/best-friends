'use strict';

const express = require('express');
const Conversation = require('./../../conversation');
const conversation = require('./conversation');

const router = express.Router();

router
    .post('/', addConversation)
    .get('/', getUserConversations)
    .use(conversation);

module.exports = router;

function getUserConversations(req, res) {

    const aggregations = [
        {
            $match: {
                conversationParticipants: { $all: [req.user._id] },
            }
        }
    ];

    Conversation.aggregate(aggregations)
        .then((data) => {
            return res.json(data || []);
        })
        .catch(() => {
            return res.sendStatus(400);
        });
}


function addConversation(req, res) {
    var newConversation = new Conversation();

    newConversation.creator = req.user._id;
    newConversation.content = req.body.conversationContent;
    newConversation.conversationParticipants = [];
    newConversation.conversationParticipants.push(req.user._id);

    newConversation.save()
        .then((conversation) => {
            return res.sendStatus(200);
        })
        .catch((err) => {
            res.send(500).json(err);
        });
}


