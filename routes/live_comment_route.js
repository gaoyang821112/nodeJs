var express = require('express');
var comment = require('./../service/live_comment_service');

// var router = express.Router();
var app = express();


/**
 * 按照文章id获取直播评论列表,同时根据某一条具体评论，按照该评论的时间进行降序分页
 */
app.get('/:articleId/:pageNum/:pageSize', function (req, res, next) {
    comment.findCommentByArticleId(req, res,cblist);
});

function cblist(res,data){
    res.send(data);
}

/**
 * 添加评论
 */
app.post('/save', function (req, res) {
    comment.saveComment(req, res,cbsave);
});

function cbsave(res,data){
    res.send(data);
}

module.exports = app;
