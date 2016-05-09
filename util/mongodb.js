var Constants = require('./constants');

var mongojs = require('mongojs');
var db = mongojs(Constants.db_connection)
exports.comment_collection = db.collection(Constants.comment_collection);