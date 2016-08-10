/**
 * Created by stan on 16/8/5.
 */
function Utility(){

}

Utility.home = function(msg){
	console.log(msg+": you have a message")
}
Utility.capitalization = function(str){
	return str.charAt(0).toUpperCase()+str.slice(1,str.length-1)
}

Utility.getRandomInt = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}







module.exports = Utility;


