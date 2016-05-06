/**
 * Created by ZMoffice on 2016/4/23.
 */
// console.log(process.argv);
// process.stdout.write('console.log');


function compute() {
    // console.trace();
    console.log('I am compute method');
}

function somethingComplited(args) {
    console.log("I am somethingComplited method");
    console.log(args);
}

function doSomething(args, callback) {
    somethingComplited(args);
    process.nextTick(callback);
    // callback();
}

doSomething('12345', function onEnd() {
    compute();
});