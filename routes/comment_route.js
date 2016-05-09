var express = require('express');
var comment_service = require('../service/comment_service.js');

// var router = express.Router();
var app = express();

/**
 * 按照文章id获取评论列表
 */
app.get('/:articleId', function (req, res, next) {
    comment_service.findCommentByArticleId(req.params.articleId, req, res);
});

/**
 * 添加评论
 */
app.post('/save', function (req, res) {
    comment_service.saveComment(req, res);
});

module.exports = app;
