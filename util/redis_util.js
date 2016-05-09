var Constants = require('./constants');
var redis = require('redis');

exports.getClient = redis.createClient(Constants.redis_connection_port, Constants.redis_connection_ip, {password : Constants.redis_connection_pwd});