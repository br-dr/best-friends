'use strict';

const express = require('express');
const router = express.Router();

const Message = require('./../message');

router
    .param('id', resolveMessage)
    // .delete('/:id', deleteMessage);

module.exports = router;

function resolveMessage(req, res, next, id) {
    Message.findOne({ _id: id })
        .populate('conversation')
        .populate('poster')
        .then((message) => {
            req.message = message;
            next();
        })
        .catch((err) => {
            next(err);
        });
}

// function deleteMessage(req, res) {
//     var isCreator = req.message.creator.equals(req.user._id);

//     if (!isCreator) {
//         return res.sendStatus(403);
//     }

//     req.message.remove((err) => {
//         if (err) {
//             return res.sendStatus(400);
//         }

//         res.sendStatus(200);
//     });
// }
