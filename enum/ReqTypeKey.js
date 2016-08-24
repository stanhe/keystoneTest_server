/**
 * Created by stan on 16/8/11.
 */
var Enum = require('enum');
var ReqType = new Enum([
	"register",
	"login",
	"searchMission",
	"getMessage",
	
	"actions",	//type
		"levelUp",	//detailType
		"getGold"
])
module.exports = ReqType;
