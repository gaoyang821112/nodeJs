var logger = require('../util/logger');
var mongodb = require('../util/mongodb');
var redis_util = require('../util/redis_util');
var ObjectId=mongodb.ObjectId;

function runComment(req, res) {

    redis_util.getClient.hget("MemberBaseInfo:" +18041988, 'nickname', function (err1, rep) {
        var nick = "游客";
        if (!err1 && rep) {
            nick = rep;
        }
        console.log(nick);
        // }
    });

    // var obj=new Object();
    //
    // var start=1050;
    // var end=200+start;
    //
    // var count=0;
    //
    // for (var i = start; i < end; i++) {
    // // var i=0;
    //     mongodb.comment_collection.find().sort({create_time: 1}).skip(i).limit(1, function (err, docs) {
    //         if (!err && docs) {
    //             var uid = docs[0].uid_comment;
    //             if(obj[uid]){
    //                 mongodb.comment_collection.update({"_id": docs[0]._id}, {$set:{nick: obj[uid]}},{multi:true},function(er,back){
    //                     count++;
    //                     console.log(count);
    //                 });
    //             }else{
    //                 redis_util.getClient.hget("MemberBaseInfo:" + uid, 'nickname', function (err1, rep) {
    //                     var nick = "游客";
    //                     if (!err1 && rep) {
    //                         nick = rep;
    //                     }
    //                     // if(!obj[uid]){
    //                     mongodb.comment_collection.update({"_id": docs[0]._id}, {$set:{nick: nick}},{multi:true},function(er,back){
    //                         count++;
    //                         console.log(count);
    //                     });
    //                     obj[uid]=nick;
    //                     // }
    //                 });
    //             }
    //
    //         }else{
    //             console.log(1);
    //         }
    //     });
    // }
    setTimeout(res.send("{code: 200}"), 3000 );



}

exports.runComment = runComment;



