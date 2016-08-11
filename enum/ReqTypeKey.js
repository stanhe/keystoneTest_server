/**
 * Created by stan on 16/8/11.
 */
var Enum = require('enum');
var ReqType = new Enum([
	"register",
	"login",
	"searchMission",
	"getMessage",
])
module.exports = ReqType;
