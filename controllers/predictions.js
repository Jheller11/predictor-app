const express = require('express')
const router = express.Router()
const isLoggedIn = require('../config/utils').isLoggedIn
const Game = require('../models/Game')
const Prediction = require('../models/Prediction')
const User = require('../models/User')

// view a users predictions for a given week
router.get('/:matchday/:id', isLoggedIn, (req, res) => {
  User.findById({ _id: req.params.id })
    .then(user => {
      Prediction.findOne({
        userId: user.id,
        matchday: req.params.matchday
      }).then(prediction => {
        if (prediction) {
          res.render('predictions/view', { prediction: prediction })
        } else {
          res.render('error')
        }
      })
    })
    .catch(err => {
      res.render('error', { error: err })
    })
})

// get form for predictions
router.get('/', isLoggedIn, (req, res) => {
  let currentWeek = 22
  Game.find({ matchday: currentWeek }).then(games => {
    res.render('predictions/index', { games: games })
  })
})

// submit predictions from a logged in user only if user has not already submitted predictions
router.post('/', isLoggedIn, (req, res) => {
  Prediction.findOne({
    matchday: req.body.matchday,
    userId: req.body.userId
  }).then(prediction => {
    if (prediction) {
      res.render('error', {
        error: 'You have already submitted a prediction for this week.'
      })
    } else {
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
    }
  })
})

module.exports = router
