/**
 * Created by ZMoffice on 2016/4/21.
 */
var redis_util = require('../util/redis_util');
var logger = require('../util/logger');
var mongodb = require('../util/mongodb');
var ResponseVo = require('../model/ResponseVo');

var Comment = require('../model/comment');
var CommentVo = require('../model/commentVo');
var constants = require('../util/constants');

var keyword = require('../util/keyword');

var telReg = /^\d{11}$/;


function findCommentByArticleId(req, res,cb) {
    logger.info("param live findCommentByArticleId " + req.params.articleId + " " + req.params.pageNum+" "+req.params.pageSize);
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
        cb(res,resVo);
        return;
    }

    /** validate the params */
    var start = (pageNum - 1) * pageSize;
    mongodb.liveCollection(articleId).find({article_id: articleId}, {
        id: 0,
       // nick:0,
        rawContent: 0
    }).sort({create_time: -1}).skip(start).limit(pageSize, function (err, docs) {
        mongodb.liveCollection(articleId).count({article_id: articleId}, function (err, count) {
            var comment = new CommentVo(docs, pageNum, pageSize, count);
            var resVo = new ResponseVo(200, comment);
            cb(res,resVo);
        });
    });

};

exports.findCommentByArticleId = findCommentByArticleId;

function excludeXss(content) {
    content = content.replace(new RegExp("<", "gm"), "");
    content = content.replace(new RegExp(">", "gm"), "");
    content = content.replace(new RegExp("/", "gm"), "");
    return content;
}

/**
 * save comment.Firstly,It will determine the ban user .Secondary replace sensitive word to *
 * @param req
 * @param res
 */
exports.saveComment = function (req, res,cb) {

    logger.info("param live saveComment " + req.body.articleId + " " + req.body.userId+" "+req.body.content);

    var articleId = Number(req.body.articleId);
    var userId = req.body.userId;
    var content = req.body.content;

    content = excludeXss(content);

    if (userId && !isNaN(articleId) && articleId > 0 && content && content.length > constants.commentword_min) {
        mongodb.banUser_collection.find({uid_disable: userId}, function (err, docs) {

            if (docs.length != 0) { //determine if the user is banned
                logger.info("ban user save live comment with userId:" + userId + ",articleid:" + articleId);
                cb(res,new ResponseVo(10000));
                return;
            }
            var ny="游客";

            //determine if comment is too frequent
            var userFrequent = constants.commentfrequent_prefix + articleId + "_userId_" + userId;
            redis_util.getClient.get(userFrequent, function (err, rep) {
                if (rep) {//comment is too frequent
                    cb(res,new ResponseVo(10100));
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

                    // mongodb.dbLiveComment.collection(constants.collectionPrefix+articleId).save(comment);
                    mongodb.liveCollection(articleId).save(comment);
                    redis_util.getClient.set(userFrequent, 1);
                    redis_util.getClient.expire(userFrequent, constants.commentfrequent_expire);
                    logger.info('save live comment 为' + comment.articleId + ' 成功');

                    // comment.uid_comment = '';
                    // comment.rawContent = '';
                    cb(res,new ResponseVo(200, comment));
                });
            });
        });
    } else {
        logger.info("param err save live comment with userId:" + userId + ",articleid:" + articleId);
        cb(res,new ResponseVo(10010));
    }

};




