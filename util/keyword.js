/**
 * load the keyword to memory
 * @type {exports}
 */

/** save the keyword */
var words=new Array();

/**replace sensitive word to */
exports.filterKeywordWithStar = function(cont){
    var len=words.length;
    var ncont=cont;
    for(var i=0;i<len;i++){
        ncont=ncont.replace(words[i],'***');
    }
    return ncont;
};

var mongodb = require('../util/mongodb');

/**load  keyword from mongodb*/
exports.loadKeywordFromMongo = function () {
    mongodb.sensitive_collection.find(function(err,docs){
        var len=docs.length;
        for(var i=0;i<len;i++){
            var key=docs[i].name.trim();
            if(key.length>0){
                words.push(key);
            }
        }
    });
};

var fs = require("fs");
var Constants = require('./constants');

// /** load keyword from fs */
// exports.loadKeywordFromFs=function(){
//     fs.readFile(Constants.sensitive_path, function (err, data) {
//         if (err) {
//             console.error(err);
//         }else {
//             var keywords = data.toString();
//             var innerwords=keywords.split('\r\n');
//             var len=innerwords.length;
//             //check the empty string
//             for(var i=0;i<len;i++){
//                 if(innerwords[i].length>0){
//                     words.push(innerwords[i]);
//                 }
//             }
//         }
//     });
// };





