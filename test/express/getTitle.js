/**
 * Created by ZMoffice on 2016/4/28.
 */
var express = require('express');
var app = express.createServer();
app.use(express.body);
app.all('/', function (request, response) {
    request.send(request.body.title);
});
app.listen(3000);