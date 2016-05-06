/**
 * Created by ZMoffice on 2016/4/29.
 */
var express = require('express');
var app = express();
app.get('/hello', function (req, res) {
    console.log(req.query.name);
    console.log(req.query.name);
    console.log(req.query.name);

    res.send('{"name":"gaoyang"}');
});
// module.exports = app;

//
// app.use(function(req, res, next) {
//     res.send('{"name":"gaoyang"}');
// });
module.exports = app;



