/**
 * Created by ZMoffice on 2016/4/23.
 */
var util = require('util');
function Base() {
    this.name = 'gaoyang';
    this.toString = function () {
        return this.name;
    }
}
var objBase = new Base();
console.log(util.inspect(objBase));
console.log(util.inspect(objBase,true,2,true));