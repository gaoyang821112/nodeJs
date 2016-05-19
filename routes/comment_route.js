var express = require('express');
var comment_service = require('../service/comment_service.js');

// var router = express.Router();
var app = express();

/**
 * 按照文章id获取评论列表
 */
app.get('/:articleId/:pageNum/:pageSize', function (req, res, next) {

    comment_service.findCommentByArticleIdPages(req, res);
});

/**
 * 按照文章id获取评论列表,同时根据某一条具体评论，按照该评论的时间进行降序分页
 */
app.get('/fromTime/:articleId/:timestamp/:pageNum/:pageSize', function (req, res, next) {

    comment_service.findCommentByArticleIdPagesFromTime(req, res);
});

/**
 * 添加评论
 */
app.post('/save', function (req, res) {
    comment_service.saveComment(req, res);
});

module.exports = app;
