var restful = require('node-restful');
var mongoose=restful.mongoose;

//Schema

var gapRSchema= mongoose.Schema({
	companyId:{type : String, required: true},
	results:[

		{
			purpose: String,
			qnumber: Number,
			ans: [{
				qnum:Number,
				value:String,
				question : String
			}]
		}
	]

});

//Return schema

module.exports = restful.model('GapResults',gapRSchema,'GapResults');