/**
 * Created by stan on 16/8/9.
 */
var APIRequestHandler = require(global.__base + "/routes/APIRequestHandler");
var player = require(global.__base+"/models/gameplayer/Player");
var ReqType = require(global.__base+"/enum/ReqTypeKey");
var LanguageType = require(global.__base+"/enum/LanguageType");
var fplocalize = require(global.__base + "/localization/fplocalize");
var login = require("./account/login");
var register = require("./account/register");
var apiHandle = require("./middleHandler/reqHandler");
var async = require("async");

var backHandler = new APIRequestHandler();

function actionResolver(req,res){
	var date = new Date();
	
	console.log("-----"+date+"------")
	console.log("body: "+JSON.stringify(req.body));
	
	var reqBody = apiHandle(req);
	//var jsonData = JSON.stringify(req.body);
	//var reqBody = JSON.parse(jsonData);
	
	var action = reqBody.type;
	var token = reqBody.token;
	var name = reqBody.name;
	
	console.log("action : "+action);
	console.log("token : "+token);
	console.log("user : "+name);
	
	if(action == ReqType.searchMission.key || action == ReqType.getMessage){
		if(token ==undefined || token.trim()==''){
			var message = fplocalize(LanguageType.en.key).missingParameter + 'token';
			//res.end(JSON.stringify({"error":"error happened","message":message}))
			var err = new Error(message);
			backHandler.sendDefaultJsonErrResponse(res,err);
		}
	}
	async.parallel([
		function(cb){
			if(action == ReqType.searchMission.key || action == ReqType.getMessage.key){
				var member = new player();
				member.getLastRequestDateByToken(token,cb)
			}else{
				cb(null,new Date())
			}
		}
	],function(err,result){
		if(err){
			//res.end(JSON.stringify({"error":"error happened","message":err}))
			backHandler.sendDefaultJsonErrResponse(res,err);
			return;
		}
		if(result[0]==undefined){
			var message = fplocalize().tokenExpired;
			var err = new Error(message)
			//res.end(JSON.stringify({"error":"error happened","message":err}))
			backHandler.sendDefaultJsonErrResponse(res,err);
			return;
		}
		var lastRequestDate = result[0].lastRequestDate;
		
		var currentDate = new Date;
		var period = currentDate - lastRequestDate;
		console.log("period ******"+period);
		if(period>= 1000*60*10){
			var message = fplocalize(LanguageType.en.key).tokenExpired;
			var err = new Error(message);
			//res.end(JSON.stringify({"error":"error happened","message":err}))
			backHandler.sendDefaultJsonErrResponse(res,err);
			return;
		}else{
			if(action == ReqType.searchMission.key || action == ReqType.getMessage.key){
				var player = new player();
				player.updateLastRequestDate(token);
			}
			routeReqWithActionKey(reqBody,res,reqBody.type); //no need decrypt data for req again
		}
	})
	
		
}


function routeReqWithActionKey(req,res,actionKey){
	if(actionKey == ReqType.register.key){
		register(req,res);
	}
	else if(actionKey == ReqType.login.key){
		login(req,res);
	}
	else if(actionKey == ReqType.searchMission.key){
		
	}
	else if(actionKey == ReqType.getMessage.key){
		
	}else{
		var message = "No this api"
		var err = new Error(message);
		backHandler.sendDefaultJsonErrResponse(res,err);
	}
}

exports = module.exports = function(req,res){
	actionResolver(req,res);
}


