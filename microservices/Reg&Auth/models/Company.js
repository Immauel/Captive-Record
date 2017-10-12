var restful = require('node-restful');
var mongoose=restful.mongoose;

//Schema

var companySchema = mongoose.Schema({
 		name: String,
 		tell: String,
 		city:String,
 		country: String,
 		type: String //Customer or partner
});

//Return schema

module.exports = restful.model('Companies',companySchema,'Companies');