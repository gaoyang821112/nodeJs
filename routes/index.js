var express = require('express');
var router = express.Router();

var indexService = require('../service/indexService.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send('<html><title>index</title><body><center><h1>index page</h1></center></body></html>');
});

/* GET home page. */
router.get('/ymtest/run', function(req, res, next) {
  // indexService.runComment();
  // res.render('index', { title: 'Express' });
  res.send('<html><title>index</title><body><center><h1>index page</h1></center></body></html>');
});

module.exports = router;
