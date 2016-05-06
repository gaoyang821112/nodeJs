/**
 * Created by ZMoffice on 2016/4/27.
 */
var http = require('http');
var queryString = require('querystring');

var contents = queryString.stringify({
    name : 'gaoyang',
    age : 21,
    address : '北京'
});

var options = {
    host : 'localhost',
    path : '/',
    port : 3000,
    method : 'POST',
    headers : {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Content-Length' : contents.length
    }
}

var request = http.request(options, function (response) {
    response.on('data', function (data) {
        console.log('后台返回数据 ' + data);
    });
    console.log(response.statusCode);
});
request.write(contents);
request.end();