/**
 * Created by ZMoffice on 2016/4/21.
 */
var redis_util = require('../util/redis_util');
var logger = require('../util/logger');
var mongodb = require('../util/mongodb');
var ObjectId = mongodb.ObjectId;
var ResponseVo = require('../model/ResponseVo');

var util = require('util');
var Comment = require('../model/comment');
var CommentVo = require('../model/commentVo');

var keyword = require('../util/keyword');

/**
 * find comment by articleid with pages
 * need <code>articleId</code>,<code>pageNum</code>,<code>pageSize</code>
 * @param req
 * @param res
 */
function findCommentByArticleIdPagesForPage (req, res) {
    var articleId = Number(req.params.articleId);
    var pageNum = Number(req.params.pageNum);
    var pageSize = Number(req.params.pageSize);
    if(isNaN(pageSize)){
        pageSize=20;
    }
    if(isNaN(pageNum) || pageNum <= 0){
        pageNum=1;
    }
    /** validate the params */
    var start = (pageNum - 1) * pageSize;
    mongodb.comment_collection.find({article_id: articleId},{id:0,rawContent:0}).sort({create_time:-1}).skip(start).limit(pageSize, function (err, docs) {
        mongodb.comment_collection.count({article_id: articleId}, function (err, count) {
            var comment = new CommentVo(docs, pageNum,pageSize, count);
            var resVo = new ResponseVo(200, comment);

            var command=new Array();
            // for(var i=0;i<docs.length;i++){
            //     command.push(["hget","MemberBaseInfo:" + docs[i].uid_comment, 'avatar_x']);
            // }
            command.push(["hget","MemberBaseInfo:" + 704813, 'avatar_x']);
            command.push(["hget","MemberBaseInfo:" + 18041912, 'avatar_x']);
            command.push(["hget","MemberBaseInfo:" + 18020578, 'avatar_x']);

            redis_util.getClient.batch(command).exec(function(err,rep){
                console.log(1);
            });
            redis_util.getClient.batch(command).exec(function(err,rep){
                console.log(1);
            });

            res.render("page",resVo);
        });
    });
};
exports.findCommentByArticleIdPagesForPage=findCommentByArticleIdPagesForPage;

/**
 * find comment by articleid with pages
 * need <code>articleId</code>,<code>pageNum</code>,<code>pageSize</code>
 * @param req
 * @param res
 */
function findCommentByArticleIdPages (req, res) {
    var articleId = Number(req.params.articleId);
    var pageNum = Number(req.params.pageNum);
    var pageSize = Number(req.params.pageSize);
    if(isNaN(pageSize)){
        pageSize=20;
    }
    if(isNaN(pageNum) || pageNum <= 0){
        pageNum=1;
    }
    /** validate the params */
    var start = (pageNum - 1) * pageSize;
    mongodb.comment_collection.find({article_id: articleId},{id:0,rawContent:0}).sort({create_time:-1}).skip(start).limit(pageSize, function (err, docs) {
        mongodb.comment_collection.count({article_id: articleId}, function (err, count) {
            var comment = new CommentVo(docs, pageNum,pageSize, count);
            var resVo = new ResponseVo(200, comment);
            res.send(resVo);
        });
    });
};
exports.findCommentByArticleIdPages=findCommentByArticleIdPages;

function findCommentByArticleIdPagesFromTime(req, res) {
    var objId=req.params.objId;
    var articleId = Number(req.params.articleId);
    var pageNum = Number(req.params.pageNum);
    var pageSize = Number(req.params.pageSize);

    if(isNaN(pageSize)){
        pageSize=20;
    }

    if(isNaN(pageNum) || pageNum <= 0){
        pageNum=1;
    }

    /** validate the params */
    if (objId) {
        if("0"==objId){
            findCommentByArticleIdPages(req,res);
            return;
        }

        mongodb.comment_collection.find({"_id":ObjectId(objId)},function(err,docs){
            if(docs.length==1){
                var start = (pageNum - 1) * pageSize;
                var createtime=docs[0].create_time;
                
                mongodb.comment_collection.find({article_id: articleId,create_time : {$lt : createtime}},{id:0,rawContent:0}).sort({create_time:-1}).skip(start).limit(pageSize, function (err, docs) {
                    mongodb.comment_collection.count({article_id: articleId,create_time : {$lt : createtime}}, function (err, count) {
                        var comment = new CommentVo(docs, pageNum,pageSize, count);
                        res.send(resVo);
                    });
                });
            }else{
                res.send(new ResponseVo(404));
            }
        });

    } else {
        res.send(new ResponseVo(401));
    }
};
exports.findCommentByArticleIdPagesFromTime =findCommentByArticleIdPagesFromTime;
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
                var raw=content;
                //filter sensitive word from content
                content = keyword.filterKeywordWithStar(content);

                var comment = new Comment(articleId, userId, content,raw, '1');
                mongodb.comment_collection.save(comment);
                logger.info('save comment 为' + comment.articleId + ' 成功');
                comment.rawContent='';
                res.send(new ResponseVo(200,comment));
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




