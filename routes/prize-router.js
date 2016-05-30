var express = require('express');
var router = express.Router();
var prizeService = require('../service/prizeService');

/* GET users listing. */
router.get('/:userid', function(req, res, next) {
  prizeService.lottery(req,res);
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a prize resource');
});

module.exports = router;
