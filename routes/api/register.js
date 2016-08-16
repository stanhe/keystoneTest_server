/**
 * Created by stan on 16/8/11.
 */
var player = require(global.__base+"/models/gameplayer/Player");
var APIRequestHandler = require(global.__base + "/routes/APIRequestHandler");
var async = require('async');
 function register(req,res,reqBody){
 	var member = new player();
	 var resHandler = new APIRequestHandler();
	 async.waterfall([
		 function(cb){
		 member.getByName(reqBody.name,cb);
	 },function(result,cb){
			 if(result==null) {
				 member.addPlayerData(reqBody.name, reqBody.password, cb)
			 }else{
				 cb("player already exit","can't creat member")
			 }
		 },function(result,cb){
			 member.getByName(reqBody.name,cb);
		 }
	 ],function(err,result){
		 if(err){
			 //res.end(JSON.stringify({"error":err,"result":result}))
			 resHandler.sendDefaultJsonErrResponseWithResData(res,err,result);
		 }else {
			 //res.writeHead(200, "application/json");
			 //res.end(JSON.stringify(result))
			 resHandler.sendDefaultJsonSuccessResponseWithResData(res,result);
		 }
	 })
 }
module.exports = function(req,res,reqBody){
	register(req,res,reqBody);
}
