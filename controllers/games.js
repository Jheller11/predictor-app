const express = require('express')
const router = express.Router()
const isLoggedIn = require('../config/utils').isLoggedIn
const Game = require('../models/Game')

router.get('/', isLoggedIn, (req, res) => {
  let currentWeek = 22
  Game.find({ matchday: currentWeek })
    .then(games => {
      res.render('games/index', { games: games })
    })
    .catch(err => {
      res.render('error', { error: err })
    })
})

module.exports = router
