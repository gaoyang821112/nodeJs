var express = require('express');
var router = express.Router();

var indexService = require('../service/indexService.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/ymtest/run', function(req, res, next) {
  // indexService.runComment();
  res.render('index', { title: 'Express' });
});

module.exports = router;
