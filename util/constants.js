//----------------------测试环境mongodb-----------------------------
 exports.db_connection = 'mongodb://192.168.7.249:27017/comment';

//----------------------线上环境mongodb-----------------------------
//exports.db_connection = 'mongodb://192.168.9.55:27017/comment';
exports.comment_collection = 'comment_article';
exports.banUser_collection = 'comment_disable_user';
exports.sensitive_collection = 'comment_sensitive_word';
exports.sensitive_path='';

//----------------------测试环境reids-----------------------------
exports.redis_connection_ip = '192.168.7.249';
exports.redis_connection_port = '6379';
exports.redis_connection_pwd = '888888';

//----------------------线上环境reids-----------------------------
// exports.redis_connection_ip = '192.168.9.20';
// exports.redis_connection_port = '6378';
// exports.redis_connection_pwd = '888888';

exports.commentfrequent_prefix='comment_frequent_';
exports.commentfrequent_expire=10;

exports.commentword_min=0;

//抽奖相关信息
//----------------------测试环境mongodb-----------------------------
exports.prize_db_connection = 'mongodb://192.168.7.249:27017/lottory';
//----------------------线上环境mongodb-----------------------------
// exports.prize_db_connection = 'mongodb://192.168.7.249:27017/lottory';
exports.mongoLotteryInfo = 'lottory_info';
exports.mongoUserLotteryRecord = 'lottory_record';
//用户是否可以抽奖的key
exports.keyLotteryUser="keyLotteryUser:";
//是否可以抽奖的field
exports.canLottery="canLottery";
//用户中奖的名称
exports.userLotteryName="lotteryName";
//用户中奖的id
exports.userLotteryId="lotteryId";
//奖品策略，第几套
exports.lotteryPlan="lotteryPlan";
//中奖率
exports.prizeRate=1;