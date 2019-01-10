const express = require('express')
const router = express.Router()
const isLoggedIn = require('../config/utils').isLoggedIn
const isAdmin = require('../config/utils').isAdmin
const Issue = require('../models/Issue')
const User = require('../models/User')

// load admin dashboard
router.get('/', isLoggedIn, isAdmin, (req, res) => {
  res.render('admin/dashboard')
})

// load list of users
router.get('/users', isAdmin, (req, res) => {
  User.find({}).then(users => {
    res.render('admin/users', { users: users })
  })
})

// load list of issues
router.get('/issues', isAdmin, (req, res) => {
  Issue.find({}).then(issues => {
    res.render('admin/issues', { issues: issues })
  })
})

module.exports = router
