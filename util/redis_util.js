var Constants = require('./constants');
var redis = require('redis');
// exports.getClient = redis.createClient(Constants.redis_connection_port, Constants.redis_connection_ip, {password : Constants.redis_connection_pwd});
var poolModule = require('generic-pool');
var redispool = poolModule.Pool({
    name     : 'redis',
    create   : function(callback) {
        var client = redis.createClient(Constants.redis_connection_port, Constants.redis_connection_ip, {password : Constants.redis_connection_pwd});
        callback(null, client);
    },
    destroy  : function(client) { client.quit(); },
    max      : 10,
    // optional. if you set this, make sure to drain() (see step 3)
    min      : 2,
    // specifies how long a resource can stay idle in pool before being removed
    idleTimeoutMillis : 30000
    // if true, logs via console.log - can also be a function
    // log : true
});
redispool.acquire(function(err, client) {
    if (err) {
        // handle error - this is generally the err from your
        // factory.create function
    }
    else {
        console.log(redispool);
        exports.getClient = client;
    }
});

exports.redisPool = redispool;
