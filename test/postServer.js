/**
 * Created by ZMoffice on 2016/4/27.
 */
var http = require('http');
var queryString = require('querystring');
var util = require('util');

http.createServer(function (request, response) {
    console.log('请求到来，解析参数');
    var post = '';
    //注册data事件监听函数，接受请求体的数据
    request.on('data', function (chunk) {
        post += chunk;
    });
    request.on('end', function () {
        //解析成真正的post请求格式
        console.log(post);
        post = queryString.parse(post);
        //向前端返回
        console.log('参数解析完成，返回name参数');
        response.end(util.inspect(post.name));
    });
}).listen(3000);