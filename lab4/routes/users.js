'use strict';
var express = require('express');
var router = express.Router();
var userModel = require('../models/user');

router.get('/user', function (req, res, next) {

    console.log('6');
    userModel.find({}, function (err, users) {
        console.log('7');
        if (err) {
            console.log('8');
            res.send('Something in fetching went wrong!');
            next()
        }
        if (req.isAuthenticated()) {
            console.log('9');
            //res.json(users);
            res.render("users");
        } else {
            res.redirect('/login')
        }
    });
});

module.exports = router;
