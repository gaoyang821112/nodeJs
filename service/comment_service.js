/**
 * Created by ZMoffice on 2016/4/21.
 */
var Constants = require('../model/constants');
var mongojs = require('mongojs');
var db = mongojs(Constants.db_connection)
var comment_collection = db.collection(Constants.comment_collection);
var redis = require('redis');

exports.findCommentByAticleId = function (articleId, req, res) {
    comment_collection.find({articleId: articleId}, function (err, docs) {
        console.log(docs);
        res.send("docs=" + docs);
        // var client = redis.createClient(Constants.redis_connection_port, Constants.redis_connection_ip, {password : Constants.redis_connection_pwd});
        // client.get("gaoyangstr", function (err, replies) {
        //     console.log(replies);
        //     client.quit();
        //     // res.send("reerere=" + replies);
        // });
    });
}