/**
 * Created by stan on 16/8/18.
 */
var APIRequestHandler = require(global.__base + "/routes/APIRequestHandler");

module.exports = function(req){
	var apiHandler = new APIRequestHandler();
	var jsonData = JSON.stringify(req.body);
	var reqBody = JSON.parse(jsonData);
	var data = reqBody.data;
	var dataStrArray = data.split(",");
	var reqResult = apiHandler.decryptDataStr(dataStrArray);
	return JSON.parse(reqResult);
}
