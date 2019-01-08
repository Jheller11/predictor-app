const utils = {
  isLoggedIn: (req, res, next) => {
    if (req.isAuthenticated()) return next()
    res.render('error', { error: 'You must be logged in to view this page.' })
  },
  getCurrentDate: () => {
    let today = new Date(Date.now())
    return today
  }
}

module.exports = utils
