/**
 * Created by ZMoffice on 2016/4/23.
 */
var util = require('util');
function Base() {
    this.name = 'base';
    this.base = 2016;
    this.sayHello = function () {
        console.log('hello ' + this.name + ' this year is ' + this.base)
    }
}

Base.prototype.showName = function () {
    console.log(this.name);
}
//原有输出
var objBase = new Base();
objBase.showName();
objBase.sayHello();

function Sub() {
    this.name = 'gaoyang';
}

util.inherits(Sub, Base);

//继承后输出
var objSub = new Sub();
objSub.showName();
// objSub.sayHello();

console.log(objBase);
console.log(objSub);