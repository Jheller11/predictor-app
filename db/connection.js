const mongoose = require('mongoose')
mongoose.Promise = Promise

mongoose.connect(
  'mongodb://localhost/predictor',
  { useNewUrlParser: true }
)

module.exports = mongoose
