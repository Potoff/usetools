const express = require('express');
const router = express.Router();
const passport = require('passport');
const userCtrl = require('../controllers/user');
const adminCtrl = require('../controllers/admin');

router.get('/login', (req, res, next) => {
    res.render('login', {error: req.flash('error')})
  })

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/user/login',
  failureFlash: true
}
), userCtrl.login
);

router.post('/signup', adminCtrl.signup)

module.exports = router;
