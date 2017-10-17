var restful = require('node-restful');
var mongoose=restful.mongoose;

//Schema

var gapQSchema= mongoose.Schema({
	qnumber : Number,
	purpose : String,
	Questions : [
		{
			qnum : Number,
			question : String
		}
	]

});

//Return schema

module.exports = restful.model('GapQuestions',gapQSchema,'GapQuestions');