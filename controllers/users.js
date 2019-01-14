const express = require('express')
const router = express.Router()
const passport = require('passport')
require('../config/passport')(passport)
const isLoggedIn = require('../config/utils').isLoggedIn

router.get('/login', (req, res) => {
  res.render('auth/login', { message: req.flash('loginMessage') })
})

router.get('/signup', (req, res) => {
  res.render('auth/signup', { message: req.flash('signupMessage') })
})

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('auth/profile')
})

router.post(
  '/login',
  passport.authenticate('local-login', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/login',
    failureFlash: true
  })
)

router.post(
  '/signup',
  passport.authenticate('local-signup', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/signup',
    failureFlash: true
  })
)

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router
