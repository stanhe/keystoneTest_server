var Enum = require('enum');


var DailyMissionType = new Enum({
	'winTheGame': 0,
	'killMinions': 1,
	'pushTower': 2,
});

module.exports = DailyMissionType;
