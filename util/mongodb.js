var Constants = require('./constants');

var mongojs = require('mongojs');
var db = mongojs(Constants.db_connection)
exports.comment_collection = db.collection(Constants.comment_collection);
exports.banUser_collection=db.collection(Constants.banUser_collection);
exports.sensitive_collection=db.collection(Constants.sensitive_collection);
