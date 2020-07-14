'use strict';
var express = require('express');
var router = express.Router();
var passport = require('passport');
var userModel = require('../models/user');
var bcrypt = require('bcrypt');
var user = require('../routes/users');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { user: req.user });
});

/*POST for login*/
//Try to login with passport
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: 'Invalid Login'
}));

/*Logout*/
router.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/');
    });
});

/*POST for register*/
router.post('/register', function (req, res) {
    //Insert user
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        var registerUser = {
            username: req.body.username,
            password: hash
        }
        //Check if user already exists
        userModel.find({ username: registerUser.username }, function (err, user) {
            if (err) console.log(err);
            if (req.body.password && req.body.username) {

                if (!user.length) {
                    const newUser = new userModel(registerUser);
                    newUser.save(function (err) {
                        if (err) console.log(err);
                        console.log("Trying to login");
                        console.log('registerUser: ' + registerUser.username + " " + registerUser.password)
                        req.login(newUser, function (err) {
                            if (err) console.log(err);
                            return res.redirect('/login');
                        });
                    });
                } else {
                    console.log('Username is already exist, please try again.');
                    res.redirect('/register');
                }

            } else if (!req.body.password && !req.body.username) {
                console.log('There is not username and password, please try again.');
                res.redirect('/register');
            } else if (!req.body.password) {
                console.log('There is not password, please try again.');
                res.redirect('/register');
            } else if (!req.body.username) {
                console.log('There is not username, please try again.');
                res.redirect('/register');
            }
        });
    });
});

/*GET for register*/
router.get('/register', function (req, res) {
    res.render('register');
});

/*GET for login*/
router.get('/login', function (req, res) {
    res.render('login');
});

module.exports = router;
