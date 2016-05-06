/**
 * Created by ZMoffice on 2016/5/4.
 */
var mongojs = require('mongojs');
var db = mongojs('mongodb://42.62.119.14:27017/zsyh');
module.exports = db.collection('product1');