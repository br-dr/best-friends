'use strict';

const express = require('express');
const Event = require('./../../event');

const router = express.Router();

module.exports = router
    .param('id', resolveEvent)
    .get('/:id', getEvent);


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
