const express = require('express')
const router = express.Router()
const isLoggedIn = require('../config/utils').isLoggedIn
const Game = require('../models/Game')
const Prediction = require('../models/Prediction')

router.get('/', isLoggedIn, (req, res) => {
  let currentWeek = 22
  Game.find({ matchday: currentWeek }).then(games => {
    res.render('predictions/index', { games: games })
  })
})

module.exports = router
