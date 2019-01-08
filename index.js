// import packages
const express = require('express')
const app = express()
const override = require('method-override')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const flash = require('connect-flash')
const session = require('express-session')
const helmet = require('helmet')
const compression = require('compression')

// import controllers
const userController = require('./controllers/users')
const gameController = require('./controllers/games')
const predictionController = require('./controllers/predictions')

// middleware config
app.use(bodyParser.urlencoded({ extended: true }))
app.use(override('_method'))
app.use(cookieParser())

// compress responses
app.use(compression())

// express security middleware
app.use(helmet())

// serve static files
app.use(express.static('public'))

// Passport
app.use(session({ secret: 'liverpool' }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// configure views
app.set('views', './views')
app.set('view engine', 'pug')

// pass logged in user to all controllers/routes
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.title = 'Premier League Predictor'
  next()
})

// controllers
app.use('/users', userController)
app.use('/games', gameController)
app.use('/predictions', predictionController)

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/*', (req, res) => {
  res.render('404')
})

app.set('port', process.env.PORT || 4000)

app.listen(app.get('port'), () =>
  console.log('server running on ' + app.get('port'))
)

module.exports = app
