/**
 * Created by ZMoffice on 2016/4/21.
 */
var redis_util = require('../util/redis_util');
var logger = require('../util/logger');
var mongodb = require('../util/mongodb');
var ResponseVo = require('../model/ResponseVo');

var util = require('util');
var Comment = require('../model/comment');
var CommentVo = require('../model/CommentVo');

var keyword = require('../util/keyword');

exports.findCommentByArticleId = function (articleId, req, res) {
    mongodb.comment_collection.find({article_id: articleId}, function (err, docs) {
        //
        // client.get("gaoyangstr", function (err, replies) {
        //     console.log(replies);
        //     // res.send("reerere=" + replies);
        // });
        //
        // logger.info('查询 articleId 为' + articleId + ' 成功 结果为 ' + util.inspect(docs));
        // var comment1 = new CommentVo(docs, '1');
        // res.send(comment1);
        // var client = redis_util.getClient;
        // docs.forEach(function (comment) {
        //     client.hmget("MemberBaseInfo:" + comment.uid_comment, 'avatar_x', function (err, replies) {
        //         console.log('replies = ' + replies);
        //     });
        // });


    });
};

/**
 * find comment by articleid with pages
 * need <code>articleId</code>,<code>pageNum</code>,<code>pageSize</code>
 * @param req
 * @param res
 */
exports.findCommentByArticleIdPages = function (req, res) {
    var articleId = Number(req.params.articleId);
    var pageNum = Number(req.params.pageNum);
    var pageSize = Number(req.params.pageSize);
    /** validate the params */
    if (!isNaN(pageNum) && !isNaN(pageSize) && pageNum > 0 && pageSize > 0) {
        var start = (pageNum - 1) * pageSize;
        mongodb.comment_collection.find({article_id: articleId}).skip(start).limit(pageSize, function (err, docs) {
            mongodb.comment_collection.count({article_id: articleId}, function (err, count) {
                var comment = new CommentVo(docs, pageNum,pageSize, count);
                var resVo = new ResponseVo(200, comment);
                res.send(resVo);
            });
        });
    } else {
        res.send(new ResponseVo(401));
    }
};

exports.findCommentByArticleIdPagesForPage = function (req, res) {
    var articleId = Number(req.params.articleId);
    var pageNum = Number(req.params.pageNum);
    if (isNaN(pageNum) || pageNum <= 0) {
        pageNum = 1;
    }
    var pageSize = 24;
    /** validate the params */
    if (!isNaN(pageSize)) {
        var start = (pageNum - 1) * pageSize;
        mongodb.comment_collection.find({article_id: articleId}).skip(start).limit(pageSize, function (err, docs) {
            mongodb.comment_collection.count({article_id: articleId}, function (err, count) {
                var comment = new CommentVo(docs, pageNum,pageSize, count);
                res.render('page', {"comment":comment,});
            });
        });
    } else {
        var comment = new CommentVo(new Array(),1,pageSize, 0);
        res.render('page', 1, comment);
    }
};

/**
 * save comment.Firstly,It will determine the ban user .Secondary replace sensitive word to *
 * @param req
 * @param res
 */
exports.saveComment = function (req, res) {
    var articleId = Number(req.body.articleId);
    var userId = Number(req.body.userId);
    var content = req.body.content;
    if(!isNaN(userId) && !isNaN(articleId) && userId>0 && articleId >0){
        mongodb.banUser_collection.find({uid_disable: userId}, function (err, docs) {

            if (docs.length == 0) {//if user is not banned

                //filter sensitive word from content
                content = keyword.filterKeywordWithStar(content);

                var comment = new Comment(articleId, userId, content, '1');
                mongodb.comment_collection.save(comment);
                logger.info('save comment 为' + comment.articleId + ' 成功');
                res.send(new ResponseVo(200));
            } else {// if user is banned
                logger.info("ban user save comment with userId:" + userId + ",articleid:" + articleId);
                res.send(new ResponseVo(10000));
            }
        });
    }else{
        logger.info("param err save comment with userId:" + userId + ",articleid:" + articleId);
        res.send(new ResponseVo(10010));
    }

};




