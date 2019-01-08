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

router.post('/', isLoggedIn, (req, res) => {
  let gamePredictions = []
  for (let i = 0; i < 10; i++) {
    let newGame = {
      gameId: req.body.gameId[i],
      score: {
        awayTeam: req.body.awayTeam[i],
        homeTeam: req.body.homeTeam[i]
      }
    }
    gamePredictions.push(newGame)
  }
  Prediction.create({
    userId: req.body.userId,
    predictions: gamePredictions,
    matchday: req.body.matchday
  }).then(() => {
    res.render('predictions/success')
  })
})

module.exports = router
