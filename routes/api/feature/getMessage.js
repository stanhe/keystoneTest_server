/**
 * 
 * Created by stan on 16/8/24.
 */
var APIRequestHandler = require(global.__base + "/routes/APIRequestHandler");

module.exports = function(req,res){
	var resHandler = new APIRequestHandler();
	var errMessage = "you are in getMessage api";
	var err = new Error(errMessage);
	resHandler.sendDefaultJsonErrResponse(res,err);
}
