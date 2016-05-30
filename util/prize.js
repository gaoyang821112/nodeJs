var constants = require('../util/constants');

/**
 * 抽奖规则。首先根据中奖概率算出最大随机生成值（根据1万亿来计算，所以概率不能小于一万亿分之一）。
 * 然后在中奖范围内区分用户属于抽中那种奖品，即使用刚才的随机生成值除以中奖概率的和，然后计算余数属于哪个区间来计算中奖奖品。
 * 所以实际上用户的中奖概率可能会小于设定值
 * @param 传入参数 每个奖品的中奖概率*100
 * @return 返回中奖的数组下标
 * @type {number}
 */
var totalCount = 10000 * 10000 * 10000;
var maxChance = constants.prizeRate * totalCount;
function genPrize(arr) {
    var radio = Math.ceil(Math.random() * totalCount);
    if (radio < maxChance) {
        //抽中
        if (arr) {
            var all = 0;
            var len = arr.length;
            for (var i = 0; i < len; i++) {
                var chce=Number(arr[i]);
                if(!isNaN(chce)) {
                    all += chce;
                }
            }
            var di=radio%all;

            for(var i=0;i<len;i++){
                if(di<arr[i]){
                    return i;
                }else{
                    di=di-arr[i];
                }
            }
        }
    }

    //未抽中
    return -1;
}
exports.getLotteryIndex=genPrize;