var restful = require('node-restful');
var mongoose=restful.mongoose;

//Schema

var adSchema= mongoose.Schema({
	compayName:String,
	expireDate:Date,
	postedDate:{type: Date, default: Date.now},
	file:{type:String, default: "defaultAd.jpg"},
	name:String,
	discription:String,
	targetLocation:String,
	TargetedAgeGroupUpper:Number,
	TargetedAgeGroupLower:Number,
    targetedGender:String,
	question:{
		des:String,
		a:String,
		b:String,
		c:String,
		answer:String,

	}

});

//Return schema

module.exports = restful.model('Ads',adSchema,'Ads');