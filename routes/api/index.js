/**
 * Created by stan on 16/8/9.
 */

var APIRequestHandler = require(global.__base + "/routes/APIRequestHandler");
var player = require(global.__base+"/models/gameplayer/Player");
var ReqType = require(global.__base+"/enum/ReqTypeKey");
var LanguageType = require(global.__base+"/enum/LanguageType");
var fplocalize = require(global.__base + "/localization/fplocalize");
var login = require("./login");
var register = require("./register");
var async = require("async");
function actionResolver(req,res){
	var date = new Date();
	console.log("-----"+date+"------")
	console.log("body: "+JSON.stringify(req.body));
	
	var jsonData = JSON.stringify(req.body);
	var reqBody = JSON.parse(jsonData)
	
	var action = reqBody.type;
	var token = reqBody.token;
	var name = reqBody.name;
	console.log("action : "+action);
	console.log("token : "+token);
	console.log("user : "+name);
	
	if(action == ReqType.searchMission.key || action == ReqType.getMessage){
		if(token ==undefined || token.trim()==''){
			var message = fplocalize(LanguageType.en.key).missingParameter + 'token';
			res.end(JSON.stringify({"error":"error happened","message":message}))
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
			res.end(JSON.stringify({"error":"error happened","message":err}))
			return;
		}
		if(result[0]==undefined){
			var message = fplocalize().tokenExpired;
			var err = new Error(message)
			res.end(JSON.stringify({"error":"error happened","message":err}))
			return;
		}
		var lastRequestDate = result[0].lastRequestDate;
		
		var currentDate = new Date;
		var period = currentDate - lastRequestDate;
		console.log("period ******"+period);
		if(period>= 1000*60*10){
			var message = fplocalize(LanguageType.en.key).tokenExpired;
			var err = new Error(message);
			res.end(JSON.stringify({"error":"error happened","message":err}))
			return;
		}else{
			if(action == ReqType.searchMission.key || action == ReqType.getMessage.key){
				var player = new player();
				player.updateLastRequestDate(token);
			}
			routeReqWithActionKey(req,res,reqBody,reqBody.type);
		}
	})
	
		
}


function routeReqWithActionKey(req,res,reqBody,actionKey){
	if(actionKey == ReqType.register.key){
		register(req,res,reqBody);
	}
	if(actionKey == ReqType.login.key){
		login(req,res,reqBody);
	}
	if(actionKey == ReqType.searchMission.key){
		
	}
	if(actionKey == ReqType.getMessage.key){
		
	}
}

exports = module.exports = function(req,res){
	actionResolver(req,res);
}


