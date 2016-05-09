/**
 * Created by ZMoffice on 2016/4/21.
 */
var redis_util = require('../util/redis_util');
var logger = require('../util/logger');
var mongodb = require('../util/mongodb');

var util = require('util');
var Comment = require('../model/comment');
var CommentVo = require('../model/CommentVo');

exports.findCommentByArticleId = function (articleId, req, res) {
    mongodb.comment_collection.find({article_id: articleId}, function (err, docs) {
        //
        // client.get("gaoyangstr", function (err, replies) {
        //     console.log(replies);
        //     // res.send("reerere=" + replies);
        // });
        //
        // logger.info('查询 articleId 为' + articleId + ' 成功 结果为 ' + util.inspect(docs));
        var comment1 = new CommentVo(docs, '1');
        res.send(comment1);
        // var client = redis_util.getClient;
        // docs.forEach(function (comment) {
        //     client.hmget("MemberBaseInfo:" + comment.uid_comment, 'avatar_x', function (err, replies) {
        //         console.log('replies = ' + replies);
        //     });
        // });
    });
};

exports.saveComment = function (req, res) {
    var articleId = req.body.articleId;
    var userId = req.body.userId;
    var content = req.body.content;
    var comment = new Comment(articleId, userId, content, '1');
    mongodb.comment_collection.save(comment);
    logger.info('save comment 为' + comment.articleId + ' 成功');
    res.send('ok');
};