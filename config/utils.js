const utils = {
  isLoggedIn: (req, res, next) => {
    if (req.isAuthenticated()) return next()
    res.render('auth/login', {
      message: 'You must be logged in to view this page.'
    })
  },
  getCurrentDate: () => {
    let today = new Date(Date.now())
    console.log(today)
    return today
  },
  isAdmin: (req, res, next) => {
    if (req.user.admin) {
      next()
    } else {
      res.render('error', {
        error: 'Please use as admin account to access this page.'
      })
    }
  }
}

module.exports = utils
