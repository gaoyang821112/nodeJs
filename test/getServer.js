/**
 * Created by ZMoffice on 2016/4/27.
 */
var http = require('http');
var urls = require('url');
var util = require("util");
http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end(util.inspect(urls.parse(request.url, true)));
    var urlParam = urls.parse(request.url, true);
    console.log(urlParam.query);
}).listen(3000);
