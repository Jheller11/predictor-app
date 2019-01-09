const express = require('express')
const router = express.Router()
const isLoggedIn = require('../config/utils').isLoggedIn
const isAdmin = require('../config/utils').isAdmin

// load admin dashboard
router.get('/', isLoggedIn, isAdmin, (req, res) => {
  res.render('admin/dashboard')
})

// load list of users

// load list of issues

module.exports = router
