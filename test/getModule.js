/**
 * Created by ZMoffice on 2016/4/21.
 */
var myModule = require('./module');
myModule.setName('gaoyang');
myModule.sayHello();

var myModule2 = require('./singleObject');
var he1 = new myModule2();
he1.setName('gaoyang1');
he1.sayHello();
var he2 = new myModule2();
he2.setName('gaoyang2');
he2.sayHello();

