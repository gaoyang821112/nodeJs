/**
 * Created by ZMoffice on 2016/4/21.
 */
// var mongojs = require('mongojs');
// var db = mongojs('mongodb://42.62.119.14:27017/zsyh');

function Comment(articleId, userId, content, status) {
    this.article_id = articleId;
    this.uid_comment = userId;
    this.content = content;
    this.reply_comment_id = '0';

    var time = new Date().Format("yyyy-MM-dd hh:mm:ss");
    this.create_time = time;
    this.status = status;

}

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


// Comment.findAll = function (articleId) {
//     console.log('articleId = ' + articleId);
//     // var comment_collection = db.coll('article_comment');
//     var comment_collection = db.collection('product1');
//     comment_collection.find({productNo: '2016040632459'},function (err, docs) {
//         console.log(docs);
//     });
// }

// exports.hello = hello;
module.exports = Comment;