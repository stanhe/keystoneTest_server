/**
 * Created by stan on 16/8/10.
 */
var player = require(global.__base+"/models/gameplayer/Player");
var async = require('async');
var crypto = require('crypto');
function login(req,res,reqBody){
	var players = new player();
	async.waterfall([
		function (cb) {
			players.getPlayerDataByNameAndPassword(reqBody.name,reqBody.password,cb)
		},function(playerData,cb){
			if(playerData == null){
				console.log("playerData is null")
				cb("player is not exist","no result")
			}else{
				console.log("playerData not null")
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
			players.updateMemberData(reqBody.name,memberDataToUpdate,cb)
		}
	],function(error,result){
		console.log("----finally----")
		if(error){
			res.end(JSON.stringify({"error":"error happened","result":result}))
		}else{
			res.writeHead(200,"application/json");
			res.end(JSON.stringify(result))
		}
	})
}

exports = module.exports = function(req,res,reqBody){
	login(req,res,reqBody);
}
