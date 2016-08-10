/**
 * Created by stan on 16/8/9.
 */
function node(){
	
}
node.prototype.inc = function(n,callback){
	callback(false,n+1)
}
node.prototype.fire = function(n,cb){
	cb("no err",n)
}
node.prototype.log = function(a,b){
	console.log(a + "   "+b);
}

node.prototype.save = function(){
	console.log('This is node.prototype.save')
}

node.save = function(){
	console.log('This is node.save')
}

module.exports = node;
