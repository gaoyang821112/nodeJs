var express = require('express');
// var router = express.Router();
var app = express();
/* GET users listing. */
app.get('/:username', function(req, res, next) {
  console.log('app.get');
  // res.send('users1 = ' + req.params.username);
  next();
});

app.all('/:username', function(req, res, next) {
  console.log('app.all');
  res.send('users2 = ' + req.params.username);
});

module.exports = app;
