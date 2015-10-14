var express = require('express');
var router = express.Router();

module.exports = function(passport){

    //sends successful login state back to angular
    router.get('/success', function(req, res){
        console.log("authenticate success-"+req.user);
        res.send({state: 'success', user: req.user ? req.user : null});
    });

    //sends failure login state back to angular
    router.get('/failure', function(req, res){
        console.log("authenticate Failure");
        res.send({state: 'failure', user: null, message: req.flash().error[0]});
    });

    //log in
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure',
        failureFlash: true
    }));

    //sign up
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure',
        failureFlash: true
    }));

    //log out
    router.get('/signout', function(req, res) {
        req.logout();
        res.send({state: 'success', user: null, message: 'Logged out'});
        //res.redirect('/');
    });

    return router;

}