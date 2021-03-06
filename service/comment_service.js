/**
 * Created by ZMoffice on 2016/4/21.
 */
var redis_util = require('../util/redis_util');
var logger = require('../util/logger');
var mongodb = require('../util/mongodb');
var ResponseVo = require('../model/ResponseVo');

var util = require('util');
var Comment = require('../model/comment');
var CommentVo = require('../model/commentVo');
var constants = require('../util/constants');

var keyword = require('../util/keyword');
var helper = require('../util/helper');

var telReg = /^\d{11}$/;

/**
 * find comment by articleid with pages
 * need <code>articleId</code>,<code>pageNum</code>,<code>pageSize</code>
 * @param req
 * @param res
 */
function findCommentByArticleIdPagesForPage(req, res) {
    // console.log(redis_util.getClient);
    logger.info("param findCommentByArticleIdPagesForPage " + req.params.articleId + " " + req.params.pageNum);

    var articleId = Number(req.params.articleId);
    var pageNum = Number(req.params.pageNum);
    var pageSize = 10;

    if (isNaN(pageNum) || pageNum <= 0) {
        pageNum = 1;
    }

    if(isNaN(articleId)){
        var docs=new Array();
        var comment = new CommentVo(docs, pageNum, pageSize, 0);
        var resVo = new ResponseVo(200, comment);
        resVo.articleId = 0;
        res.render("page", resVo);
        return;
    }

    //close comment
    if(!constants.canComment){
        var docs=new Array();
        var comment = new CommentVo(docs, pageNum, pageSize, 0);
        var resVo = new ResponseVo(200, comment);
        resVo.articleId = articleId;
        res.render("page", resVo);
        return ;
    }

    /** validate the params */
    var start = (pageNum - 1) * pageSize;
    mongodb.comment_collection.find({article_id: articleId}, {
        id: 0,
        uid_comment:0,
        rawContent: 0
    }).sort({create_time: -1}).skip(start).limit(pageSize, function (err, docs) {
        mongodb.comment_collection.count({article_id: articleId}, function (err, count) {
            var comment = new CommentVo(docs, pageNum, pageSize, count);
            var resVo = new ResponseVo(200, comment);
            resVo.articleId = articleId;

            var ny="游客";

            for (var i = 0; i < docs.length; i++) {

                    var now = new Date().getTime();
                    var nt = convertTime(now, docs[i].create_time);
                    docs[i].create_time = nt;
                    // docs[i].nick = ny;
                    // docs[i].uid_comment = '';
                    if(!docs[i].nick){
                        docs[i].nick = ny;
                    }
                    if (telReg.test(docs[i].nick)) {
                        var nn = docs[i].nick.substr(0, 3) + "****" + docs[i].nick.substr(7, 4);
                        docs[i].nick = nn;
                    }
            }
            res.render("page", resVo);
        });
    });
};
var minuteOfSeconds = 60;
var hourOfSeconds = 3600;
var dayOfSeconds = hourOfSeconds * 24;
var weekOfSeconds = dayOfSeconds * 7;

function convertTime(now, l) {
    var span = now - l;
    var spanSecond = span / 1000;
    if (spanSecond < minuteOfSeconds) {
        return "刚刚";
    } else if (spanSecond < hourOfSeconds) {
        var minute = spanSecond / minuteOfSeconds;
        return Math.floor(minute) + "分钟前";
    } else if (spanSecond < dayOfSeconds) {
        var hour = spanSecond / hourOfSeconds;
        return Math.floor(hour) + "小时前";
    } else if (spanSecond < weekOfSeconds) {
        var day = spanSecond / dayOfSeconds;
        return Math.floor(day) + "天前";
    } else {
        var da = new Date(l);
        var re = da.getFullYear() + "-";
        var lmon = da.getMonth() + 1;
        if (lmon < 10) {
            re = re + "0" + lmon + "-";
        } else {
            re = re + lmon + "-";
        }
        var lday = da.getDate();
        if (lday < 10) {
            re = re + "0" + lday;
        } else {
            re = re + lday;
        }

        return re;
    }
}
exports.findCommentByArticleIdPagesForPage = findCommentByArticleIdPagesForPage;

/**
 * find comment by articleid with pages
 * need <code>articleId</code>,<code>pageNum</code>,<code>pageSize</code>
 * @param req
 * @param res
 */
function findCommentByArticleIdPages(req, res) {
    logger.info("param findCommentByArticleIdPages " + req.params.articleId + " " + req.params.pageNum+" "+req.params.pageSize);
    var articleId = Number(req.params.articleId);
    var pageNum = Number(req.params.pageNum);
    var pageSize = Number(req.params.pageSize);
    if (isNaN(pageSize)) {
        pageSize = 20;
    }
    if (isNaN(pageNum) || pageNum <= 0) {
        pageNum = 1;
    }

    if(isNaN(articleId)){
        var docs=new Array();
        var comment = new CommentVo(docs, pageNum, pageSize, 0);
        var resVo = new ResponseVo(200, comment);
        res.render("page", resVo);
        return;
    }

    //close comment
    if(!constants.canComment){
        var docs=new Array();
        var comment = new CommentVo(docs, pageNum, pageSize, 0);
        var resVo = new ResponseVo(200, comment);
        // cb(res,resVo);
        // res.render("page", resVo);
        res.send(resVo);
        return ;
    }

    /** validate the params */
    var start = (pageNum - 1) * pageSize;
    mongodb.comment_collection.find({article_id: articleId}, {
        id: 0,
       // nick:0,
        rawContent: 0
    }).sort({create_time: -1}).skip(start).limit(pageSize, function (err, docs) {
        mongodb.comment_collection.count({article_id: articleId}, function (err, count) {
            var comment = new CommentVo(docs, pageNum, pageSize, count);
            var resVo = new ResponseVo(200, comment);
            res.send(resVo);
        });
    });
};
exports.findCommentByArticleIdPages = findCommentByArticleIdPages;

function findCommentByArticleIdPagesFromTime(req, res) {
    logger.info("param findCommentByArticleIdPagesFromTime " + req.params.articleId + " " + req.params.pageNum+" "+req.params.pageSize+ " "+req.params.timestamp);
    var timestamp = Number(req.params.timestamp);
    var articleId = Number(req.params.articleId);
    var pageNum = Number(req.params.pageNum);
    var pageSize = Number(req.params.pageSize);
    if (isNaN(pageSize)) {
        pageSize = 20;
    }
    if (isNaN(timestamp)) {
        timestamp = 0;
    }
    if (isNaN(pageNum) || pageNum <= 0) {
        pageNum = 1;
    }

    if(isNaN(articleId)){
        var docs=new Array();
        var comment = new CommentVo(docs, pageNum, pageSize, 0);
        var resVo = new ResponseVo(200, comment);
        res.render("page", resVo);
        return;
    }

    //close comment
    if(!constants.canComment){
        var docs=new Array();
        var comment = new CommentVo(docs, pageNum, pageSize, 0);
        var resVo = new ResponseVo(200, comment);
        // cb(res,resVo);
        // res.render("page", resVo);
        res.send(resVo);
        return ;
    }

    /** validate the params */
    if (0 == timestamp) {
        findCommentByArticleIdPages(req, res);
        return;
    }
    mongodb.comment_collection.find({article_id: articleId, create_time: {$lt: timestamp}}, {
        id: 0,
        //nick:0,
        rawContent: 0
    }).sort({create_time: -1}).limit(pageSize, function (err, docs) {
        mongodb.comment_collection.count({
            article_id: articleId,
            create_time: {$lt: timestamp}
        }, function (err, count) {
            var comment = new CommentVo(docs, pageNum, pageSize, count);
            var resVo = new ResponseVo(200, comment);
            res.send(resVo);
        });
    });

};

function excludeXss(content) {
    content = content.replace(new RegExp("<", "gm"), "");
    content = content.replace(new RegExp(">", "gm"), "");
    content = content.replace(new RegExp("/", "gm"), "");
    return content;
}
exports.findCommentByArticleIdPagesFromTime = findCommentByArticleIdPagesFromTime;
/**
 * save comment.Firstly,It will determine the ban user .Secondary replace sensitive word to *
 * @param req
 * @param res
 */
exports.saveComment = function (req, res) {

    logger.info("param saveComment " + req.body.articleId + " " + req.body.userId+" "+req.body.content);

    var articleId = Number(req.body.articleId);
    var userId = req.body.userId;
    var content = req.body.content;

    //close comment
    if(!constants.canComment){
        // cb(res,new ResponseVo(15000));
        res.send(new ResponseVo(15000));
        return ;
    }

    content = excludeXss(content);

    if ( userId && !isNaN(articleId) && articleId > 0 && content && content.length > constants.commentword_min) {
        mongodb.banUser_collection.find({uid_disable: userId}, function (err, docs) {

            if (docs.length != 0) { //determine if the user is banned
                logger.info("ban user save comment with userId:" + userId + ",articleid:" + articleId);
                res.send(new ResponseVo(10000));
                return;
            }
            var ny="游客";

            //determine if comment is too frequent
            var userFrequent = constants.commentfrequent_prefix + articleId + "_userId_" + userId;
            redis_util.getClient.get(userFrequent, function (err, rep) {
                if (rep) {//comment is too frequent
                    res.send(new ResponseVo(10100));
                    return;
                }
                redis_util.getClient.hget("MemberBaseInfo:" + userId, 'nickName', function (err, rep) {

                    var raw = content;
                    //filter sensitive word from content
                    content = keyword.filterKeywordWithStar(content);
                    var comment = new Comment(articleId, userId, content, raw, '1');
                    comment.nick=ny;

                    if(!err && rep){
                        if (telReg.test(rep)) {
                            var nn = rep.substr(0, 3) + "****" + rep.substr(7, 4);
                            comment.nick = nn;
                        } else {
                            comment.nick = rep;
                        }
                    }

                    mongodb.comment_collection.save(comment);
                    redis_util.getClient.set(userFrequent, 1);
                    redis_util.getClient.expire(userFrequent, constants.commentfrequent_expire);
                    logger.info('save comment 为' + comment.articleId + ' 成功');

                    // comment.uid_comment = '';
                    // comment.rawContent = '';
                    res.send(new ResponseVo(200, comment));
                });
            });
        });
    } else {
        logger.info("param err save comment with userId:" + userId + ",articleid:" + articleId);
        res.send(new ResponseVo(10010));
    }

};




