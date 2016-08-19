var CryptoManager = require(global.__base + "/manager/CryptoManager");
var Utility = require(global.__base + "/helper/Utility");
var _ = require("underscore");
var Enum = require('enum');
var cryptoManager = new CryptoManager();
function APIRequestHandler() {
	if (arguments.callee._singletonInstance)
		return arguments.callee._singletonInstance;
	arguments.callee._singletonInstance = this;

	var resGeneralData = {};
	this.getResGeneralData = function () {
		return resGeneralData;
	}
}


//Define the content type of the data from Req/ to Res
var ResContentTypeString = ["application/json;charset=utf-8"];
APIRequestHandler.prototype.ResContentType = new Enum({
	"JSON": 0
});


//Helper Functions
APIRequestHandler.prototype.dataArrayToDataStr = function (dataAry) {
	return dataAry[0] + "," + dataAry[1];
}


APIRequestHandler.prototype.dataStrToDataAry = function (dataStr) {
	//console.log('dataStr: ' + dataStr);
	var dataStrArray = dataStr.split(",");
	return dataStrArray;
}


/***
 *
 ***/
APIRequestHandler.prototype.addResponseGeneralData = function (key, value) {
	if (!Utility.isString(key) || !Utility.isString(value)) {
		log.error("APIRequestHandler.addResponseGeneralData Key and Value should be String");
		return;
	}
	this.getResGeneralData()[key] = value;
}

/***
 *    resData should be a JSON Objet
 *
 *    Return - the decrypted datastr
 *
 ***/
APIRequestHandler.prototype.sendRes = function (res, resData, type) {
	if (typeof resData != 'object') {
		console.error("APIRequestHandler.sendRes resData should be JSON Object");
		return;
	}

	_.extend(resData, this.getResGeneralData());
	resDataStr = JSON.stringify(resData);
	var encryptedDataAry = this.encryptDataStr(resDataStr);

	if (res == undefined) {
		console.log("res is undefined");
	}
	if (res.writeHead == undefined) {
		console.log("res.writeHead is undefined");
	}
	if (ResContentTypeString == undefined) {
		console.log("ResContentTypeString is undefined");
	}
	if (type == undefined) {
		console.log("type is undefined");
	}
	if (type.value == undefined) {
		console.log("type.value is undefined");
	}
	res.writeHead(200, ResContentTypeString[type.value]);
	var resData = {
		data: this.dataArrayToDataStr(encryptedDataAry)  //back encrypt data
	};
	var resStr = JSON.stringify(resData);
	//console.log("-----backData-----"+JSON.stringify(JSON.parse(resDataStr)));
	//console.log("-----backData_encrypt-----"+JSON.stringify(resStr));
	res.end(resStr);									//back encrypt data
	//res.end(JSON.stringify(JSON.parse(resDataStr)));	//back  data direct
}

/***
 *    resDataStr should be in JSON format
 *
 *    Return - the encrypted String and the seed in an array
 *
 ***/
APIRequestHandler.prototype.encryptDataStr = function (resDataStr) {
	var d = new Date();
	var timeStr = d.getTime().toString();
	var encryptedStr = cryptoManager.encryptDataStr(resDataStr, timeStr);

	var encryptedDataAry = [encryptedStr, timeStr];
	return encryptedDataAry;
}


/***
 *    reqDataStr should be in Array with following format [data,key]
 *
 *    Return - the decrypted datastr
 *
 ***/
APIRequestHandler.prototype.decryptDataStr = function (reqDataAry) {
	var decryptedStr = null;
	if (reqDataAry != null && reqDataAry.length >= 2) {
		var dataStr = reqDataAry[0].trim();
		var key = reqDataAry[1].trim();
		decryptedStr = cryptoManager.decryptDataStr(dataStr, key);
	}

	return decryptedStr;
}


/****
 * response generator and default response
 *
 ****/
APIRequestHandler.prototype.generateStatusResponse = function (result, message) {
	var returnObj = {
		status: result == true ? 1 : 0,
		message: message
	};


	return returnObj;
}

APIRequestHandler.prototype.sendDefaultJsonSuccessResponse = function (res) {
	this.sendDefaultJsonSuccessResponse(res, undefined);
}


APIRequestHandler.prototype.sendDefaultJsonSuccessResponseWithResData = function (res, resDataIn) {
	var resData = this.generateStatusResponse(true, "", undefined);
	if (resDataIn != undefined) {
		_.extend(resData, {data: resDataIn});
	}

	this.sendRes(res, resData, this.ResContentType.JSON);
}

APIRequestHandler.prototype.sendDefaultJsonErrResponse = function (res, err) {
	console.error("Error response with err: " + err.message + " \nwith Stack: " + err.stack);
	this.sendDefaultJsonErrResponseWithResData(res, err);
}

APIRequestHandler.prototype.sendDefaultJsonErrResponseWithResData = function (res, err, resDataIn) {


	var resData = this.generateStatusResponse(false, err.toString(), err);
	if (resDataIn != undefined) {
		_.extend(resData, {data: resDataIn});
	}
	this.sendRes(res, resData, this.ResContentType.JSON);
}

APIRequestHandler.prototype.sendMissingParameterErrorResponse = function (res, message) {
	var err = new Error(message);
	this.sendDefaultJsonErrResponse(res, err);
}

module.exports = APIRequestHandler;


