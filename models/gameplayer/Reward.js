var keystone = require('keystone');
var Types = keystone.Field.Types;

var Utility = require(global.__base + '/helper/Utility');
var RewardType = require(global.__base + "/enum/RewardType");


var rewardTypeOptionStr = Utility.enumToKeystonOptionStr(RewardType);

var RewardModel = new keystone.List("RewardModel", {
	map: {name: 'rewardName'}

});


RewardModel.add({
	rewardName: {type: Types.Text},
	rewardType: {type: Types.Select, options: rewardTypeOptionStr, initial: true, index: true, required: true},
	rewardTotal: {type: Types.Number}

});

RewardModel.defaultColumns = "rewardName,rewardType,rewardTotal";


RewardModel.register();


function RewardDemo() {

}


RewardDemo.prototype.addRewardData = function (rewardName, rewardType, rewardTotal, callback) {
	var newMissionData = {
		rewardName: rewardName,
		rewardType: rewardType,
		rewardTotal: rewardTotal
	};
	var newMissionDataModel = RewardModel.model(newMissionData);
	newMissionDataModel.save(function (err) {
		callback(err, newMissionDataModel);
	})

}


module.exports = RewardDemo;


