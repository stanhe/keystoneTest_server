/**
 * Created by stan on 16/8/24.
 */
var APIRequestHandler = require(global.__base + "/routes/APIRequestHandler");
var ReqType = require(global.__base+"/enum/ReqTypeKey");
var async = require("async");
var player = require(global.__base+"/models/gameplayer/Player");

module.exports  = function(req,res){
	var apiHandler = new APIRequestHandler();
	var member = new player();
	var token = req.token;
	var actionsType = req.actionsType;
	var actionNo = req.actionsNo;
	

	async.series([function(cb){
		member.getLastRequestDateByToken(token,cb);
	}],function(err,result){
		if(err){
			apiHandler.sendDefaultJsonErrResponse(res,err);
		}else{
			var playerName = result[0].playerName;
			switch (actionsType){
				case ReqType.levelUp.key:
					if(playerName != null){
						member.updatePlayerActionByPlayerName(playerName,actionsType,actionNo,actionBcak);
					}
					break;
				case ReqType.getGold.key:
					if(playerName !=null ){
						member.updatePlayerActionByPlayerName(playerName,actionsType,actionNo,actionBcak);
					}
					break;
			}
		}
	});
	
	
function actionBcak(err,result){
	if(err){
		apiHandler.sendDefaultJsonErrResponse(res,err)
	}else{
		apiHandler.sendDefaultJsonSuccessResponseWithResData(res,result);
	}
}
}




