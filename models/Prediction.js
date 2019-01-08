const mongoose = require('../db/connection')

const gamePredictionSchema = new mongoose.Schema({
  gameId: {
    type: String,
    required: true
  },
  score: {
    homeTeam: {
      type: Number,
      required: true
    },
    awayTeam: {
      type: Number,
      required: true
    }
  }
})

const predictionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  matchday: {
    type: Number,
    required: true
  },
  predictions: [gamePredictionSchema],
  score: {
    type: Number,
    required: true,
    default: 0
  }
})

module.exports = mongoose.model('Prediction', predictionSchema)
