var fs = require('fs');
fs.readFile('file.txt', 'utf-8', function (err, data) {
    if (err) {
        console.log(err.message);
    } else {
        console.log("异步 " + data);
    }
});

var data = fs.readFileSync('file.txt', 'utf-8');
console.log("同步 " + data);

console.log("end");
