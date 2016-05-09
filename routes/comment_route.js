var express = require('express');
var Comment = require('../model/comment');
var comment_service = require('../service/comment_service.js');

// var router = express.Router();
var app = express();

/**
 * 按照文章id获取评论列表
 */
app.get('/:articleId', function (req, res, next) {
    // comment_collection.find({articleId: req.params.articleId}, function (err, docs) {
    //     console.log(docs);
    //     res.send("docs=" + docs);
    //     // var client = redis.createClient(Constants.redis_connection_port, Constants.redis_connection_ip, {password : Constants.redis_connection_pwd});
    //     // client.get("gaoyangstr", function (err, replies) {
    //     //     console.log(replies);
    //     //     client.quit();
    //     //     res.send("reerere=" + replies);
    //     // });
    // });
    comment_service.findCommentByAticleId(req.params.articleId, req, res);
});

/**
 * 添加评论
 */
app.post('/save', function (req, res) {
    var articleId = req.body.articleId;
    var userId = req.body.userId;
    var content = req.body.content;
    var comment = new Comment(articleId, userId, content, '1');
    comment_service.saveComment(comment, req, res);
});

module.exports = app;
