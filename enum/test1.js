/**
 * Created by stan on 16/8/5.
 */
var utils = require("./test");
var localization = require("../localization/fplocalize")
//var LanguageType = require("../enum/LanguageType");
var LanguageType = require("./LanguageType");
var someStack = [];
let luke = {
	jedi :true,
	age:28
}
someStack.push('i am stan');
someStack.push("ni mei ");
var theString = someStack.join(' ');


function getprop(prop){
	return luke[prop]
}

var log = utils.home;
log("hello superman");
//let name = (prop)=> {
//	"use strict";
//	console.log(prop)
//}
//for(let i=0;i<10;i++) {
//	console.log(utils.getRandomInt(0, 10));
//}


var async = require('async');

/**
 * 按顺序依次执行一组函数。每个函数产生的值，都将传给下一个。如果中途出错，后面的函数将不会被执行。错误信息以及之前产生的结果，将传给waterfall最终的callback。
 *
 * 这个函数名为waterfall(瀑布)，可以想像瀑布从上到下，中途冲过一层层突起的石头。
 *
 * 注意，该函数不支持json格式的tasks
 */
 //async.waterfall(tasks, [callback]);

//var t1 = require('./t');
//var t2 = new t1();
//var log = t2.log;
//var inc1 = t2.inc;
//var fire1 = t2.fire;

//
//log("hello","boy");

/**
 * 所有函数正常执行，每个函数的结果都将变为下一个函数的参数。
 *
 * 注意，所有的callback都必须形如callback(err, result)，但err参数在前面各函数中无需声明，它被自动处理。
 */
 1.1
//async.waterfall([
//	function(cb) { log('1.1.1: ', 'start'); cb(null, 3); },
//	function(n, cb) { log('1.1.2: ',n); inc1(n, cb); },
//	function(n, cb) { log('1.1.3: ',n); fire1(n*n, cb); }
//], function (err, result) {
//	log('1.1 err: ', err); // -> null
//	log('1.1 result: ', result); // -> 16
//});
//async.series([
//	function(cb) { log('1.1.1: ', 'start'); cb(null, 3); },
//	function(n, cb) { log('1.1.2: ',5); inc1(5, cb); },
//	function(n, cb) { log('1.1.3: ',8); fire1(2*2, cb); }
//], function (err, result) {
//	log('1.1 err: ', err); // -> null
//	log('1.1 result: ', result); // -> 16
//});









//
//var ciphertext = CryptoJS.AES.encrypt('my message', 'secret12');
//
//console.log(ciphertext.toString());
//// Decrypt
//var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret12');
//var plaintext = bytes.toString(CryptoJS.enc.Utf8);

//var manager = require("../manager/CryptoManager");
//var Manager = new manager();
//var key = Manager.encryptDataStr("stan is a superman","good");
//console.log(key);
//
//var result = Manager.decryptDataStr(key,"good");
//console.log(result);



//function test(){
//	if (arguments.callee._singletonInstance) {
//		console.log("callee0 :" + arguments.callee);
//		return arguments.callee._singletonInstance;
//	}
//	arguments.callee._singletonInstance = this;
//	console.log("callee1 :"+arguments.callee);
//}
//
//
//var CryptoJS = require("crypto-js");
//
//function getLeadingZeros (str, size){
//	var retStr = "";
//	for(var i = 0; i < size; i++){
//		retStr = retStr +'0';
//	}
//
//	return (retStr + str).substr(-size);
//};
//
//function encrypto(rawDataStr, seed){
//	console.log("--------*** encrypt ***--------")
//	var key_Sha = CryptoJS.SHA256(seed.toString());
//	var iv_Sha = CryptoJS.SHA512(seed.toString());
//	console.log("key_sha : "+key_Sha)
//	console.log("iv_sha : "+iv_Sha)
//	console.log("key_getLeadingZeros _key_sha: "+getLeadingZeros(key_Sha,32))
//	console.log("key_getLeadingZeros _key_iv_sha: "+getLeadingZeros(iv_Sha,16))
//
//	var key_Hex = CryptoJS.enc.Utf8.parse( getLeadingZeros(key_Sha,32) );
//	var iv_Hex = CryptoJS.enc.Utf8.parse( getLeadingZeros(iv_Sha,16) );
//
//	console.log("key_Hex : "+key_Hex)
//	console.log("iv_Hex : "+iv_Hex)
//
//
//	var encrypted = CryptoJS.AES.encrypt(rawDataStr,key_Hex,{iv:iv_Hex});
//	console.log("--------*** result ***--------")
//	console.log("encrypted : "+encrypted);
//	console.log("encrypted.ciphertext : "+encrypted.ciphertext.toString(CryptoJS.enc.Base64));
//	return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
//}
//
//encrypto("stan","12580");
