
/**
 * This file defines the CryptoManager for encryption and decrytion of message.
 * 
 *  Seed is hashed using SHA256 and SHA512 to produce IV and key
 *  Message is then encrypt and descrypted using AES256 algorithm
 *
 *  Dependency: crypto-js     //run npm install crypto-js --save
 */

 var CryptoJS = require("crypto-js");

function CryptoManager(){
 	if ( arguments.callee._singletonInstance )
 		return arguments.callee._singletonInstance;
 	arguments.callee._singletonInstance = this;

 }


 function getLeadingZeros (str, size){
 	var retStr = "";
 	for(var i = 0; i < size; i++){
 		retStr = retStr +'0';
 	}
	
 	return (retStr + str).substr(-size);
 };


 CryptoManager.prototype.encryptDataStr = function(rawDataStr, seed){
 	var key_Sha = CryptoJS.SHA256(seed.toString());
 	var iv_Sha = CryptoJS.SHA512(seed.toString());
 	var key_Hex = CryptoJS.enc.Utf8.parse( getLeadingZeros(key_Sha,32) );
 	var iv_Hex = CryptoJS.enc.Utf8.parse( getLeadingZeros(iv_Sha,16) );

 	var encrypted = CryptoJS.AES.encrypt(rawDataStr,key_Hex,{iv:iv_Hex});

 	return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
 }

 CryptoManager.prototype.decryptDataStr  = function(encryptedDataStr, seed){
 	var key_Sha = CryptoJS.SHA256(seed.toString());
 	var iv_Sha = CryptoJS.SHA512(seed.toString());

 	var key_Utf8 = CryptoJS.enc.Utf8.parse( getLeadingZeros(key_Sha,32) );
 	var iv_Utf8 = CryptoJS.enc.Utf8.parse( getLeadingZeros(iv_Sha,16) );

 	var decrypted = CryptoJS.AES.decrypt(encryptedDataStr,key_Utf8,{iv:iv_Utf8});
 	var decryptedStr = decrypted.toString(CryptoJS.enc.Utf8);

 	return decryptedStr;
 }
 
 module.exports = CryptoManager;
