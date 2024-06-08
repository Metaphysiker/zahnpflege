var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/is_user_logged_in', function(req, res, next) {
  res.json({
   message: "You are logged in!",
   status: "success"
  })
});

module.exports = router;
