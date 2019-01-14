const express = require('express')
const router = express.Router()
const { isAdmin, refreshGames } = require('../config/utils')
const Game = require('../models/Game')

// retrieve a single matchday's games
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

router.post('/update', isAdmin, (req, res) => {
  refreshGames()
  res.render('admin/dashboard', { message: 'Updated game data successfully.' })
})

// get weeks list
router.get('/', (req, res) => {
  res.render('games/index')
})

module.exports = router
