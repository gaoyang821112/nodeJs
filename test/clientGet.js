/**
 * Created by ZMoffice on 2016/4/28.
 */
var http = require('http');

http.get(
    {
        host : '42.62.119.14',
        path : '/zsyh/product/Jifentao',
        port : 8080
    }, function (response) {
        response.on('data', function (data) {
        console.log('后台返回数据 ' + data.toString());
    });
});
