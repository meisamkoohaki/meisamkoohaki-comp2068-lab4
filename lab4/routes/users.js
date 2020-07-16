'use strict';
var express = require('express');
var router = express.Router();
var userModel = require('../models/user');

router.get('/user', function (req, res, next) {

    userModel.find({}, function (err, users) {
        if (err) {
            res.send('Something in fetching went wrong!');
            next()
        }
        if (req.isAuthenticated()) {
            //res.json(users);
            
            res.render("users", {
                list: 'meisam'
            });

            //res.send("users", `<h3>Custom Property Value: ${'meisam'}`);

        } else {
            res.redirect('/login')
        }
    });
});

module.exports = router;
