/**
 * Created by stan on 16/8/24.
 */
var APIRequestHandler = require(global.__base + "/routes/APIRequestHandler");
module.exports = function(req,res){
	var apiHandle = new APIRequestHandler();
	var errMessage = "you are in searchMission api";
	var err = new Error(errMessage);
	apiHandle.sendDefaultJsonErrResponse(res,err);
}
