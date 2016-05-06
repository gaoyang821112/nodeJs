/**
 * Created by ZMoffice on 2016/4/21.
 */
var name;
exports.setName = function (thyName) {
    name = thyName;
}
exports.sayHello = function () {
    console.log('hello,' + name);
}