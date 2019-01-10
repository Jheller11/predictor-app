const mongoose = require('../db/connection')

const issueSchema = new mongoose.Schema({
  created: {
    type: Date,
    required: true,
    default: Date.now()
  },
  resolved: {
    type: Boolean,
    required: true,
    default: false
  },
  resolvedText: {
    type: String
  },
  issueText: {
    type: String,
    required: true
  },
  submittedBy: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Issue', issueSchema)
