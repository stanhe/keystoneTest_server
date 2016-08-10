/**
 * Created by stan on 16/8/9.
 */

var APIRequestHandler = require(global.__base + "/routes/APIRequestHandler");
var player = require(global.__base+"/models/gameplayer/Player")
var async = require("async");
var crypto = require('crypto');

function actionResolver(req,res){
	var date = new Date();
	console.log("-----"+date+"------")
	console.log("body: "+JSON.stringify(req.body));
	//var backData = {"name":"stan","firstName":"ho","aiHao":"kanPianer"}
	var players = new player();
	
	//res.writeHead(200,"application/json");
	//res.end(JSON.stringify(backData))
	
	async.waterfall([
		function (cb) {
			players.getPlayerDataByNameAndPassword("stan","123",cb)
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
			players.updateMemberData("stan",memberDataToUpdate,cb)
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

exports = module.exports = function(req,res){
	actionResolver(req,res);
}

