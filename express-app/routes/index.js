var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/welcome', function(req, res, next) {
  res.json({'message': "Welcome!"});
});

module.exports = router;
