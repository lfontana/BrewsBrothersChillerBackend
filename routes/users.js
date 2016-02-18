var express = require('express');
var router = express.Router();


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated())
    return next();
  else
    // Return error content: res.jsonp(...) or redirect: res.redirect('/login')
    res.send('You need to log in !!!!')
}

// app.get('/account', ensureAuthenticated, function(req, res) {
//   // Do something with user via req.user
// });

/* GET users listing. */
router.get('/',ensureAuthenticated, function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
