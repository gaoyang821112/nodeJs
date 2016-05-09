/**
 * Created by ZMoffice on 2016/4/21.
 */
var Constants = require('../model/constants');
var mongojs = require('mongojs');
var db = mongojs(Constants.db_connection)
var comment_collection = db.collection(Constants.comment_collection);
var redis = require('redis');
var logger = require('../model/logger');

exports.findCommentByAticleId = function (articleId, req, res) {
    comment_collection.find({articleId: articleId}, function (err, docs) {
        res.send("docs=" + docs);
        // var client = redis.createClient(Constants.redis_connection_port, Constants.redis_connection_ip, {password : Constants.redis_connection_pwd});
        // client.get("gaoyangstr", function (err, replies) {
        //     console.log(replies);
        //     // res.send("reerere=" + replies);
        // });
        // client.quit();
        logger.info('查询 articleId 为' + articleId + ' 成功 结果为 ' + docs);
    });
}

exports.saveComment = function (comment, req, res) {
    comment_collection.save(comment);
    res.send('ok');
}