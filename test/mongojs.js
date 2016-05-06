/**
 * Created by ZMoffice on 2016/5/4.
 */
var mongojs = require('mongojs');
var db = mongojs('mongodb://42.62.119.14:27017/zsyh');
var mycollection = db.collection('product1');
mycollection.find(function (err, docs) {
    console.log(docs);
});