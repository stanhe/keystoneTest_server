/**
 * Created by stan on 16/8/25.
 */
var APIRequestHandler = require(global.__base + "/routes/APIRequestHandler");
var ReqType = require(global.__base+"/enum/RewardType");
var async = require("async");
var Reward = require(global.__base+"/models/gameplayer/Reward");
