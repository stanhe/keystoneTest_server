/**
 * Created by stan on 16/8/5.
 */
var keystone = require('keystone');
var Types = keystone.Field.Types;
var PlayerModel = new keystone.List("PlayerModel",{map:{name:'playerName'}});
var crypto = require('crypto');

PlayerModel.add({
	playerName :{type: Types.Text},
	playerPassword:{type: Types.Text},
	
	playerAction:{type: Types.Number,default:0},
	playerLevel: {type: Types.Number, default: 1},
	playerGold: {type: Types.Number, default: 0},
	lastRequestDate:{type: Types.Datetime,initial:true,required:false,index:true,noedit: true},
	token:{type:Types.Text}
})

PlayerModel.defaultColumns="playerName,playerLevel,playerGold,token";

PlayerModel.register();

function PlayerDemo(){
	
}

PlayerDemo.prototype.addPlayerData = function (playerName, playerPassword, callback) {
	crypto.randomBytes(24,function(ex,buf){
		var token  = buf.toString('hex');
		var date = new Date();
		var newPlayerData = {
			playerName:playerName,
			playerPassword: playerPassword,
			token:token,
			lastRequestDate:date
		}
		var newPlayerDataModel = PlayerModel.model(newPlayerData);
		newPlayerDataModel.save(function(error){
			callback(error,newPlayerDataModel);
		});
	});
};

PlayerDemo.prototype.getPlayerDataByNameAndPassword = function(playerName,playerPassword,callback){
	var condition = {playerName:playerName,playerPassword:playerPassword}
	PlayerModel.model.findOne(condition).select("-playerPassword").exec(callback)
}
PlayerDemo.prototype.getByName = function(playerName,callback){
	var condition = {playerName:playerName}
	PlayerModel.model.findOne(condition).select("-playerPassword").exec(callback)
}
PlayerDemo.prototype.updatePlayerGoldByPlayerName = function (playerName, rewardGold, callback) {

	var condition = {playerName: playerName};
	PlayerModel.model.findOneAndUpdate(condition,
		{"$inc": {"playerGold": rewardGold}}
		, {upsert: false, new: true}
	).exec(callback);

}
PlayerDemo.prototype.updateMemberData = function(playerName,memberData,callback){
	PlayerModel.model.findOneAndUpdate(
		{playerName:playerName},
		memberData,
		{upsert:false,new:true})
	.select("-playerPassword")
	.exec(callback)
}
PlayerDemo.prototype.getLastRequestDateByToken = function(token){
	PlayerModel.model.findOneAndUpdate(
		{token:token},
		{lastRequestDate : new Date()},
		{upsert:false})
	.exec();
}
PlayerDemo.prototype.updateLastRequestDate = function(token){
	PlayerModel.model.findOneAndUpdate(
		{token:token},
		{lastRequestDate :new Date()},
		{upsert:false}
	).exec()
}

module.exports = PlayerDemo;
