const fetch = require('node-fetch')
require('dotenv').config()
const Game = require('../models/Game')

const utils = {
  // check for logged in user
  isLoggedIn: (req, res, next) => {
    if (req.isAuthenticated()) return next()
    res.render('auth/login', {
      message: 'You must be logged in to view this page.'
    })
  },
  // return current date
  getCurrentDate: () => {
    let today = new Date(Date.now())
    console.log(today)
    return today
  },
  // check if user has admin rights
  isAdmin: (req, res, next) => {
    if (req.user.admin) {
      next()
    } else {
      res.render('error', {
        error: 'Please use as admin account to access this page.'
      })
    }
  },
  // retrieve games list with updated scores, replace data in db
  refreshGames: () => {
    Game.deleteMany({}).then(
      fetch('http://api.football-data.org/v2/competitions/2021/matches', {
        headers: {
          'X-Auth-Token': process.env.FOOTBALL_DATA_KEY
        }
      })
        .then(res => res.json())
        .then(json => {
          json.matches.forEach(match => {
            Game.create({
              gameId: match.id,
              date: match.utcDate,
              matchday: match.matchday,
              status: match.status,
              homeTeam: {
                name: match.homeTeam.name,
                score: match.score.fullTime.homeTeam
              },
              awayTeam: {
                name: match.awayTeam.name,
                score: match.score.fullTime.awayTeam
              }
            })
          })
        })
        .then(() => {
          console.log('done')
        })
    )
  }
}

module.exports = utils
