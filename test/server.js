//引入http的包
var http = require('http');

var server = http.createServer( function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<head><meta charset="utf-8"/></head>');
    res.write('<h1>我们已经有服务了</h1>');
    res.end('<p>By GaoYang</p>');
});
server.listen(3000);
server.on('close', function () {
    console.log("server is closed");
});
server.close();
console.log('Http server is listening at port 3000!!!!!!!!!!!!');