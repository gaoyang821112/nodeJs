var Constants = require('./constants');

var mongojs = require('mongojs');
var db = mongojs(Constants.prize_db_connection)
exports.lotteryInfo = db.collection(Constants.mongoLotteryInfo);
exports.userLotteryRecord=db.collection(Constants.mongoUserLotteryRecord);
