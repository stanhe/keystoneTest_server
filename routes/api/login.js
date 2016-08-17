/**
 * Created by stan on 16/8/10.
 */
var player = require(global.__base+"/models/gameplayer/Player");
var APIRequestHandler = require(global.__base + "/routes/APIRequestHandler");
var async = require('async');
var crypto = require('crypto');
function login(req,res,reqBody){
	var players = new player();
	var resHandler = new APIRequestHandler();
	
	var jsonData = JSON.stringify(req.body);
	var currentBody = JSON.parse(jsonData)
	
	var type = currentBody.type;
	var password = currentBody.password;
	var name = currentBody.name;
	console.log("user : "+name);
	console.log("password : "+password);
	console.log("type : "+type);
	async.waterfall([
		function (cb) {
			players.getPlayerDataByNameAndPassword(name,password, cb)
		},function(playerData,cb){
			if(playerData == null){
				checkPlayer(players,name,cb);
			}else{
				cb(null,playerData)
			}
		},function(result,cb){
			crypto.randomBytes(24, function (err, buf) {
				var newToken = buf.toString('hex');
				cb(null, newToken);
			});
		}, function (newToken,cb) {
			var date = new Date();
			var memberDataToUpdate = {
				token:newToken,
				lastRequestDate:date
			};
			players.updateMemberData(name,memberDataToUpdate,cb)
		}
	],function(err,result){
		if(err){
			resHandler.sendDefaultJsonErrResponse(res,err);
		}else{
			resHandler.sendDefaultJsonSuccessResponseWithResData(res,result);
		}
		
	})
}

function checkPlayer(players,name,cb){
	async.parallel([function(cb){
			players.getByName(name,cb);
		}],
		function(err,result){
		if(result ==undefined || result.toString().trim()==''){
			cb("Player no exist",result);
		}else{
			cb("password incorrect",result);
		}
	})
}

exports = module.exports = function(req,res,reqBody){
	login(req,res,reqBody);
}
