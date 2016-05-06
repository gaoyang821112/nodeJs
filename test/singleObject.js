/**
 * Created by ZMoffice on 2016/4/21.
 */
function hello() {
    var name;
    this.setName = function (thyName) {
        name = thyName;
    }
    this.sayHello = function () {
        console.log('hello2,' + name);
    }
}
// exports.hello = hello;
module.exports = hello;