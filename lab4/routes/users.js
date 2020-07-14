'use strict';
var express = require('express');
var router = express.Router();
var userModel = require('../models/user');
//app.set('view engine', 'ejs');

/* GET users listing. */
router.get('/user', function (req, res) {
    res.render('users');
});

//router.get('/user', function (req, res) {
//    userModel.find({ username: req.body.username }, function (err, user) {
//        if (err) console.log(err);
//        //mess = username;
//    });
//});

/*Logout*/

module.exports = router;
