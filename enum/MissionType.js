var Enum = require('enum');


var MissionType = new Enum({
	'DailyMission': 0,
	'MainMission': 1,
	
	'MissionHandle'
});

module.exports = MissionType;
