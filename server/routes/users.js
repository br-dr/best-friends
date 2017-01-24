const express = require('express');
const User = require('./../user');

const router = express.Router();

module.exports = router
    .get('/', (req, res) => {
        var searchData = req.query.searchText;

        User.find({ name: new RegExp(searchData, 'i') }, (err, data) => {
            if (err) {
                return res.sendStatus(400);
            }

            res.json(data);
        });
    });
