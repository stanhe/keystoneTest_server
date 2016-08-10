/*
* Utility included some helper static function 
*/

var keystone = require('keystone');
var mongoose = keystone.mongoose;
var ValidationError = mongoose.Error.ValidationError;
var ValidatorError  = mongoose.Error.ValidatorError;

function Utility(){
	
}


/**
* An enum object as argument and string as return value
* The enum need to have count defined
**/
Utility.enumToKeystonOptionStr = function(enumObj) {
	var returnOptionString = "";
	for(var i=0;i<enumObj.enums.length;i++){
		returnOptionString += enumObj.get(i).key;

		if(i < enumObj.enums.length - 1){
			returnOptionString += ",";
		}
	}
	return returnOptionString;
};

Utility.createPreSaveError = function(msg) {
	var error = new ValidationError(this);
    error.errors.email = new ValidatorError(null, msg, null, null);
    return error;
}

Utility.createError = function(msg) {
    return new Error(msg);
}


Utility.isString = function(str) {
    return typeof(str) === 'string' || s instanceof String;
}


Utility.capitalize = function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

Utility.getClientIp = function(req) {
    var str = (req.headers["X-Forwarded-For"] ||
            req.headers["x-forwarded-for"] ||
            '').split(',')[0] ||
           req.client.remoteAddress;
	var array = str.split(':');
	return array.slice(-1)[0];
};

Utility.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = Utility;