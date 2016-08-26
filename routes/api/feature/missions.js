/**
 * Created by stan on 16/8/25.
 */
var APIRequestHandler = require(global.__base + "/routes/APIRequestHandler");
var ReqType = require(global.__base+"/enum/ReqTypeKey");
var async = require("async");
var Mission = require(global.__base+"/models/gameplayer/MissionData");

module.exports  = function(req,res){
	var apiHandler = new APIRequestHandler();
	var mission = new Mission();
	
	var missionType = req.missionType;


	async.series([function(cb){
		//mission.
	}],function(err,result){
		if(err){
			apiHandler.sendDefaultJsonErrResponse(res,err);
		}else{
			var playerName = result[0].playerName;
			switch (actionsType){
				case ReqType.levelUp.key:
					if(playerName != null){
						member.updatePlayerActionByPlayerName(playerName,actionsType,actionNo,actionBack);
					}
					break;
				case ReqType.getGold.key:
					if(playerName !=null ){
						member.updatePlayerActionByPlayerName(playerName,actionsType,actionNo,actionBack);
					}
					break;
			}
		}
	});


	function actionBack(err,result){
		if(err){
			apiHandler.sendDefaultJsonErrResponse(res,err)
		}else{
			apiHandler.sendDefaultJsonSuccessResponseWithResData(res,result);
		}
	}
}
