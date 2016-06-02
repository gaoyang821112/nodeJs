var logger = require('../util/logger');
var mongodb = require('../util/mongodb');
var redis_util = require('../util/redis_util');
var ObjectId=mongodb.ObjectId;

function runComment(req, res) {

    var obj=new Object();

    var start=350;
    var end=450;

    var count=0;

    for (var i = start; i < end; i++) {
    // var i=0;
        mongodb.comment_collection.find().sort({create_time: 1}).skip(i).limit(1, function (err, docs) {
            if (!err && docs) {
                var uid = docs[0].uid_comment;
                if(obj[uid]){
                    mongodb.comment_collection.update({"_id": docs[0]._id}, {$set:{nick: obj[uid]}}, {multi: true});
                    count++;
                    console.log(count);
                }else{
                    redis_util.getClient.hget("MemberBaseInfo:" + uid, 'nickname', function (err1, rep) {
                        var nick = "游客";
                        if (!err1 && rep) {
                            nick = rep;
                        }
                        // if(!obj[uid]){
                        mongodb.comment_collection.update({"_id": docs[0]._id}, {$set:{nick: nick}}, {multi: true});
                        obj[uid]=nick;
                        count++;
                        console.log(count);
                        // }
                    });
                }

            }else{
                console.log(1);
            }
        });
    }
    setTimeout(res.send("{code: 200}"), 3000 );



}

exports.runComment = runComment;



