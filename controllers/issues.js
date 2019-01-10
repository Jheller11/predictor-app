const express = require('express')
const router = express.Router()
const isLoggedIn = require('../config/utils').isLoggedIn
const Issue = require('../models/Issue')

router.get('/new', isLoggedIn, (req, res) => {
  res.render('issueform')
})

router.post('/new', isLoggedIn, (req, res) => {
  Issue.create({
    issueText: req.body.issueText,
    submittedBy: req.user.id
  }).then(() => {
    res.render('home', { message: 'Thank you.' })
  })
})

module.exports = router
