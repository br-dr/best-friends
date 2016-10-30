'use strict';

const express = require('express');
const Event = require('./../../event');
const event = require('./event');

const router = express.Router();

router
    .post('/', addEvent)
    .get('/', findEvents)
    .use(event);

module.exports = router;

function addEvent(req, res) {
    var newEvent = new Event();

    newEvent.creator = req.user._id;
    newEvent.title = req.body.title;
    newEvent.description = req.body.description;
    newEvent.place = req.body.place;
    newEvent.isPrivate = req.body.isPrivate;
    newEvent.invitedPersons = req.body.invitedPersons;

    var time = req.body.time;
    var date = req.body.date;

    newEvent.time = new Date(
        new Date(date).getFullYear(),
        new Date(date).getMonth(),
        new Date(date).getDate(),
        new Date(time).getHours(),
        new Date(time).getMinutes()
    );

    newEvent.save()
        .then((event) => {
            return res.sendStatus(200);
        })
        .catch((err) => {
            res.send(500).json(err);
        });
}

function findEvents(req, res) {
    var searchData = req.query.searchText;

    Event.find({ title: new RegExp(searchData, 'i') })
        .then((data) => {
            return res.json(data);
        })
        .catch(() => {
            return res.sendStatus(400);
        });
}
