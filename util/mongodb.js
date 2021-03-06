var Constants = require('./constants');

var mongojs = require('mongojs');
var db = mongojs(Constants.db_connection)
exports.comment_collection = db.collection(Constants.comment_collection);
exports.banUser_collection=db.collection(Constants.banUser_collection);
exports.sensitive_collection=db.collection(Constants.sensitive_collection);
exports.ObjectId=mongojs.ObjectId;
var dbLiveComment=mongojs(Constants.db_live_comment_connection);
exports.dbLiveComment=dbLiveComment;

exports.liveCollection=function(articleid){
    return dbLiveComment.collection(Constants.collectionPrefix+articleid);
}