const express = require('express')
const router = express.Router()
const isLoggedIn = require('../config/utils').isLoggedIn
const Game = require('../models/Game')

router.get('/:matchday', (req, res) => {
  let currentWeek = req.params.matchday
  Game.find({ matchday: currentWeek })
    .then(games => {
      res.render('games/matchday', { games: games })
    })
    .catch(err => {
      res.render('error', { error: err })
    })
})

// get weeks list
router.get('/', (req, res) => {
  res.render('games/index')
})

module.exports = router
