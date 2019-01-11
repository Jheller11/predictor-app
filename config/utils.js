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
  }
}

module.exports = utils
