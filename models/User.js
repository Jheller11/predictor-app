const mongoose = require('../db/connection.js')
const bcrypt = require('bcrypt-nodejs')

const scoreSchema = new mongoose.Schema({
  matchday: {
    type: Number,
    required: true
  },
  score: {
    type: Number,
    required: true
  }
})

const userSchema = new mongoose.Schema({
  local: {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    displayName: {
      type: String,
      required: true,
      unique: true
    }
  },
  admin: {
    type: Boolean,
    required: true,
    default: false
  },
  scores: [scoreSchema]
})

userSchema.methods.generateHash = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

userSchema.methods.validPassword = (password, user) => {
  return bcrypt.compareSync(password, user.local.password)
}

module.exports = mongoose.model('User', userSchema)
