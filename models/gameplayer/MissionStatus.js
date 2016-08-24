/**
 * Created by stan on 16/8/24.
 */
var keystone = require('keystone');
var Types = keystone.Field.Types;

var MissionStatusModel = new keystone.List('MissionStatusModel');

MissionStatusModel.add({

	player: {type: Types.Relationship, ref: 'PlayerModel'},
	completedMission: {type: Types.Relationship, ref: 'MissionModel'},
	completeDate: {type: Types.Datetime},

});

MissionStatusModel.defaultColumns = "player,completedMission,completeDate";

MissionStatusModel.register();


function MissionStatusDemo() {

}


MissionStatusDemo.prototype.addMainMissionStatus = function (player, completedMission, callback) {

	var newData = {
		player: player,
		completedMission: completedMission,
	};
	//console.log("result: ***********\n" + JSON.stringify(newData, null, "\n") + "\n***********");

	var newDataModel = MissionStatusModel.model(newData);

	newDataModel.save(function (err, newDataModel) {
		callback(err, newDataModel);
	});
};

MissionStatusDemo.prototype.addDailyMissionStatus = function (player, completedMission, callback) {
	var date = new Date();

	var newData = {
		player: player,
		completedMission: completedMission,
		completeDate: date
	};
	//console.log("result: ***********\n" + JSON.stringify(newData, null, "\n") + "\n***********");

	var newDataModel = MissionStatusModel.model(newData);

	newDataModel.save(function (err, newDataModel) {
		callback(err, newDataModel);
	});
};


MissionStatusDemo.prototype.getMissionStatusData = function (player, completedMission, callback) {

	var condition = {
		player: player,
		completedMission: completedMission
	};
	MissionStatusModel.model.findOne(condition).select("-" + player.playerPassword).exec(callback);

};

MissionStatusDemo.prototype.getMissionStatusDataByPlayerData = function (player, callback) {

	var condition = {
		player: player
	};
	MissionStatusModel.model.find(condition)
		.populate("player", "-playerPassword -playerAction -lastRequestDate -token")
		.populate("completedMission", "missionId missionName missionType completeType completeCondition reward")

		.exec(callback);

};

exports = module.exports = MissionStatusDemo;
