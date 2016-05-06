//声明事件对象
var events = require('events');
var util = require('util');
var emitter = new events.EventEmitter();
//注册监听事件1
emitter.on('some_event' , function (arg1, arg2) {
    console.log('这是一个自定义事件1', arg1, arg2);
});
emitter.on('some_event' , function (arg1, arg2) {
    console.log('这是一个自定义事件2', arg1, arg2);
});
emitter.once('once_event' , function (arg1, arg2) {
    console.log('这是一个自定义事件3', arg1, arg2);
});
emitter.emit('some_event', 'gaoyang1', 'gaoyang2');
console.log(util.inspect(emitter));
emitter.removeAllListeners();
console.log(util.inspect(emitter));

// emitter.emit('error');
// setTimeout(function () {
//     event.emit('some_event');
// }, 1000);