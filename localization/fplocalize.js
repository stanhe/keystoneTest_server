var LanguageType = require("../enum/LanguageType");

exports = module.exports = function(language){
	switch(language) {
		case LanguageType.en.key:{
			return require("./en");
			break;
		}
		case LanguageType.cn.key:{
			return require("./cn");
			break;
		}
		case LanguageType.tw.key:{
			return require("./tw");
			break;
		}
		default:{
			return require("./en");
		}
	}
}
