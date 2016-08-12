/**
 * Created by stan on 16/8/10.
 */
var player = require(global.__base+"/models/gameplayer/Player");
var async = require('async');
var crypto = require('crypto');
function login(req,res,reqBody){
	var players = new player();
	
	var jsonData = JSON.stringify(req.body);
	var currentBody = JSON.parse(jsonData)
	
	var type = currentBody.type;
	var typeValue = (type == undefined || type == '');
	var password = currentBody.password;
	var name = currentBody.name;
	console.log("user : "+name);
	console.log("password : "+password);
	console.log("type : "+type);
	async.waterfall([
		function (cb) {
			if(typeValue){
				players.getPlayerDataByNameAndPassword(name,password, cb)
			}else {
				players.getPlayerDataByNameAndPassword(reqBody.name, reqBody.password, cb)
			}
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
			if(typeValue){
				players.updateMemberData(name,memberDataToUpdate,cb)
			}else {
				players.updateMemberData(reqBody.name, memberDataToUpdate, cb)
			}
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
