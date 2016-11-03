'use strict';

const express = require('express');
const Event = require('./../../event');

const router = express.Router();

module.exports = router
    .param('id', resolveEvent)
    .get('/:id', getEvent)
    .post('/:id/accept', acceptEvent)
    .post('/:id/decline', declineEvent);


function resolveEvent(req, res, next, id) {
    Event.findOne({ _id: req.params.id })
        .populate('creator')
        .then((data) => {
            req.event = data;
            next();
        })
        .catch((err) => {
            next(err);
        });

}

function getEvent(req, res) {
    res.json(req.event);
}


function acceptEvent(req, res) {

    if (req.event.accepted.indexOf(req.user._id) === -1) {
        req.event.accepted.push(req.user._id);
    }

    var index = req.event.declined.indexOf(req.user._id);

    if (index !== -1) {
        req.event.declined.splice(index, 1);
    }

    // req.event.accepted = req.event.accepted.reduce((arr, id) => {
    //     if (arr.indexOf(id) === -1) {
    //         arr.push(id);
    //     }
    //     return arr;
    // }, []);

    req.event.save()
        .then((event) => {
            res.json(event);
        }).catch(() => {
            res.status(500);
        });
}

function declineEvent(req, res) {
    var index = req.event.accepted.indexOf(req.user._id);

    if (index > -1) {
        req.event.accepted.splice(index, 1);
    }

    var declinedIndex = req.event.declined.indexOf(req.user._id);

    if (declinedIndex === -1) {
        req.event.declined.push(req.user._id);
    }

    req.event.save()
        .then((event) => {
            res.json(event);
        }).catch(() => {
            res.sendStatus(500);
        });
}