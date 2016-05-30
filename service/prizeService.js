var redis = require('../util/redis_util');
var constants = require('../util/constants');
var mongodb = require('../util/mongodb_prize');
var ResponseVo = require('../model/ResponseVo');
var prizeAlg = require('../util/prize');
var logger = require('../util/logger');

function lottery(req, res) {

    var userid = req.params.userid;

    logger.info("begin to prize with userid:"+userid);

    //hash结构 1：可以抽奖，0：不可以抽奖或者已经抽过奖
    redis.getClient.hget(constants.keyLotteryUser + userid, constants.canLottery, function (err, rep) {
        if (!err) {
            //TODO 方便测试总是可以抽取
            rep="1";
            if ("1" == rep) {
                //抽奖方案第几套
                redis.getClient.get(constants.lotteryPlan, function (err, rep1) {
                    if (!err && rep1) {
                        var sets = rep1;

                        mongodb.lotteryInfo.find({lottory_set: sets},function (err,docs) {

                            if(docs && (docs instanceof Array)){
                                var lotteryId = 0;
                                var lotteryName = "";
                                var remark="";
                                //抽奖算法
                                var arr = new Array();
                                for (var i = 0; i < docs.length; i++) {
                                    arr.push(docs[i].lottory_chance);
                                }
                                var index = prizeAlg.getLotteryIndex(arr);
                                //由于人数较少，故此处处理为认为单线程处理，而没有使用事务以及相关的判断
                                //如果抽中，且抽中的奖品还没有被抽完则继续进行处理
                                if (index > -1 ) {
                                   var num= Number(docs[index].lottory_number);
                                    if(!isNaN(num) && num>1) {
                                        lotteryId = docs[index].lottory_seq;
                                        lotteryName = docs[index].lottory_name;
                                        remark=docs[index].lottory_remark;
                                    }
                                }

                                //用户只能抽取一次。不管是否抽中，设置为0；
                                redis.getClient.hset(constants.keyLotteryUser + userid, constants.canLottery, "0");

                                if (lotteryId) {
                                    //奖品个数减一
                                    mongodb.lotteryInfo.update({lottory_set: sets, lottory_seq: lotteryId}, {$inc: {lottory_number: -1}});
                                    //添加mongodb中的抽中记录信息
                                    var data = new Object();
                                    data.userId = userid;
                                    data.lottory_seq = lotteryId;
                                    data.lottory_name = lotteryName;
                                    data.createTime = (new Date()).getTime();
                                    mongodb.userLotteryRecord.save(data);

                                    //抽中的情况下设置用户信息中redis的抽中信息
                                    redis.getClient.hset(constants.keyLotteryUser + userid, constants.userLotteryId, lotteryId);
                                    redis.getClient.hset(constants.keyLotteryUser + userid, constants.userLotteryName, lotteryName);

                                    //用户抽中
                                    var back = new Object();
                                    back.userId = userid;
                                    back.lottory_seq = lotteryId;
                                    back.lottory_name = lotteryName;
                                    back.lottory_remark =remark;

                                    logger.info("user prize succ with userid:"+userid+",lottory_set:"+sets+",lottory_seq:"+lotteryId+",lottory_name:"+lotteryName);
                                    res.send(new ResponseVo(200, back));
                                } else {
                                    //用户未抽中
                                    logger.info("user prize nothing with userid:"+userid+",lottory_set:"+sets);
                                    res.send(new ResponseVo(10100));
                                }
                            }else{
                                //没有抽奖信息的相关数据
                                logger.info("obtain prize info err with userid:"+userid+",lottory_set:"+sets);
                                res.send(new ResponseVo(10150));
                            }
                        });
                    }
                });
            } else {
                //用户无权限抽奖或已经抽过奖品
                logger.info("user has no authortion to prize with userid:"+userid);
                res.send(new ResponseVo(10200));
            }
        } else {
            //数据获取错误  未能够从redis获取数据
            logger.info("obtain user authortion info err with userid:"+userid);
            res.send(new ResponseVo(10300));
        }
    });
}

exports.lottery = lottery;