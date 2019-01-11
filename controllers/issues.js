// This router controls the issues submitted by users which function as
// a to do list of fixes for the admin.  Admin can add notes/details when
// issue is marked as resolved.

const express = require('express')
const router = express.Router()
const { isLoggedIn, isAdmin } = require('../config/utils')
const Issue = require('../models/Issue')

router.get('/new', isLoggedIn, (req, res) => {
  res.render('issues/issueform')
})

router.post('/new', isLoggedIn, (req, res) => {
  Issue.create({
    issueText: req.body.issueText,
    submittedBy: req.user.id
  })
    .then(() => {
      res.render('home', { message: 'Thank you.' })
    })
    .catch(err => {
      res.render('error', { error: err })
    })
})

router.put('/:id', isAdmin, (req, res) => {
  Issue.findOneAndUpdate(
    { _id: req.params.id },
    { resolved: true, resolvedText: req.body.resolvedText }
  ).then(() => {
    res.render('admin/dashboard', { message: 'Issue resolved.' })
  })
})

router.get('/:id', isAdmin, (req, res) => {
  Issue.findOne({ _id: req.params.id })
    .then(issue => {
      res.render('issues/edit', { issue: issue })
    })
    .catch(err => {
      res.render('error', { error: err })
    })
})

// load list of issues
router.get('/', isAdmin, (req, res) => {
  Issue.find({}).then(issues => {
    res.render('issues/index', { issues: issues })
  })
})

module.exports = router
