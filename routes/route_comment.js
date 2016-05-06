var express = require('express');
var Comment = require('../model/comment');
var Constants = require('../model/constants');
var mongojs = require('mongojs');
var db = mongojs(Constants.db_connection)
var comment_collection = db.collection(Constants.comment_collection);
var redis = require('redis');

// var router = express.Router();
var app = express();
/* GET users listing. */
app.get('/:articleId', function (req, res, next) {
    // comment_collection.find({articleId: req.params.articleId}, function (err, docs) {
    //     console.log(docs);
    //     res.send(docs);
    // });
    var client = redis.createClient(Constants.redis_connection_port, Constants.redis_connection_ip, {password : Constants.redis_connection_pwd});
    client.get("gaoyangstr", function (err, replies) {
        console.log(replies);
        client.quit();
        res.send("reerere=" + replies);
    })
    // res.send(req.params.articleId);
});


app.post('/save', function (req, res) {
    // console.log(req.body.articleId);
    // var articleId = req.body.articleId;
    // var userId = req.body.userId;
    // var content = req.body.content;
    // var comment = new Comment(articleId, userId, content, '1');
    // // console.log(comment);
    // comment_collection.save(comment);
    console.log('I am in');
    res.send('ok');
});
// app.all('/:username', function(req, res, next) {
//   console.log('app.all');
//   res.send('users2 = ' + req.params.username);
// });

module.exports = app;
