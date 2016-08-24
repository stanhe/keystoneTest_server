/**
 * Created by stan on 16/8/24.
 */
var keystone = require('keystone');
var Types = keystone.Field.Types;
var MissionModel = new keystone.List("MissionModel", {
	map: {name: 'missionName'}
});


var Utility = require(global.__base + '/helper/Utility');
var DailyMissionType = require(global.__base + "/enum/DailyMissionType");
var MainMissionType = require(global.__base + "/enum/MainMissionType");
var MissionType = require(global.__base + "/enum/MissionType");

var completeTypeOptionStr = Utility.enumToKeystonOptionStr(DailyMissionType) + "," + Utility.enumToKeystonOptionStr(MainMissionType);

var missionTypeOptionStr = Utility.enumToKeystonOptionStr(MissionType);

MissionModel.add({
	missionId: {type: Types.Text},
	missionName: {type: Types.Text},
	missionType: {type: Types.Select, options: missionTypeOptionStr, initial: true, index: true, required: true},
	completeType: {type: Types.Select, options: completeTypeOptionStr, initial: true, index: true, required: true},
	completeCondition: {type: Types.Number},
	//completeDate: {type: Types.Datetime},
	//levelReward: {type: Types.Text},
	//goldReward: {type: Types.Text},
	//status: {type: Types.Text, default: 'uncompleted', require: true},
	reward: {type: Types.Relationship, ref: 'RewardModel'},

});

MissionModel.defaultColumns = "missionName,missionType,completeType,completeCondition,reward";


MissionModel.register();

function MissionDemo() {

}


MissionDemo.prototype.addMissionData = function (missionId, missionName, completeCondition, levelReward, goldReward, reward, callback) {
	var newMissionData = {
		missionId: missionId,
		missionName: missionName,
		completeCondition: completeCondition,
		levelReward: levelReward,
		goldReward: goldReward,
		reward: reward
	};
	var newMissionDataModel = MissionModel.model(newMissionData);
	newMissionDataModel.save(function (err) {
		callback(err, newMissionDataModel);
	}).populate("reward")


}


MissionDemo.prototype.getMissionDataByStatus = function (status, callback) {
	var condition = {status: status};
	MissionModel.model.find(condition).select("-status").exec(callback);
}


MissionDemo.prototype.getMissionDataByMissionId = function (missionId, callback) {
	var condition = {missionId: missionId};
	MissionModel.model.findOne(condition)
		.populate("reward")
		.exec(callback);
}

MissionDemo.prototype.missionComplete = function (missionId, callback) {
	MissionModel.model.findOneAndUpdate(
		{missionId: missionId},
		{status: 'complete'},
		{upsert: false, new: true}
	).exec(callback);
}


MissionDemo.prototype.updateMissionById = function (missionId, missionName, completeCondition, levelReward, goldReward, callback) {
	MissionModel.model.findOneAndUpdate(
		{missionId: missionId},
		{
			missionName: missionName,
			completeCondition: completeCondition,
			levelReward: levelReward,
			goldReward: goldReward
		},
		{upsert: false, new: true}
	).exec(callback);
}


MissionDemo.prototype.findMainMissionByCompleteCondition = function (actionType, playerAction, callback) {

	MissionModel.model.findOne()
		.where("missionType").equals("MainMission")
		.where("completeType").equals(actionType)
		.where("completeCondition").equals(playerAction)
		.populate("reward")
		.exec(callback);

}

MissionDemo.prototype.findDailyMissionByCompleteCondition = function (actionType, playerAction, callback) {

	MissionModel.model.findOne()
		.where("missionType").equals("DailyMission")
		.where("completeType").equals(actionType)
		.where("completeCondition").equals(playerAction)
		.populate("reward")
		.exec(callback);

}

MissionDemo.prototype.updateMissionCompleteTime = function (missionId, callback) {

	var date = new Date();
	MissionModel.model.findOneAndUpdate(
		{missionId: missionId},
		{completeDate: date},
		{upsert: false, new: true}
	)
		.populate("reward")
		.exec(callback);


}

MissionDemo.prototype.getAllMission = function (callback) {

	MissionModel.model.find()
		.populate("reward")
		.exec(callback);
}


module.exports = MissionDemo;
