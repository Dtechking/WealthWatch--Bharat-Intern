const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');
const isLoggedIn = require('../middleware/isLoggedIn');


// Signup Page
router.get('/signup', (req, res) => {
    const error = req.flash('error')[0];
    res.render('signup', { error });
});

router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    

    // Create a new user using the User model
    User.register(new User({ username }), password, (err, user) => {
        if (err) {
            console.error(err);
            req.flash('error', err.message);
            return res.redirect('/signup');
        }
        // Authenticate the user and redirect to the dashboard
        passport.authenticate('local')(req, res, () => {
            res.redirect('/dashboard');
        });
    });
});

// Login Page
router.get('/login', (req, res) => {
    const error = req.flash('error')[0];
    res.render('login', { error });
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
}), (req, res) => {});

// Logout
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error(err);
            return res.redirect('/');  // Redirect even if an error occurs during logout
        }
        res.redirect('/');
    });
});


module.exports = router;
