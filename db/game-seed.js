const mongoose = require('./connection')
const fetch = require('node-fetch')
require('dotenv').config()
// import game model
const Game = require('../models/Game')

const refreshGames = () => {
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
        mongoose.connection.close()
      })
  )
}

refreshGames()
