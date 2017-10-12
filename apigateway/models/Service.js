var restful = require('node-restful');
var mongoose=restful.mongoose;

//Schema

var serviceSchema = mongoose.Schema({
		name: String,
 		port: String,
 		ip:String
});

//Return schema

module.exports = restful.model('Services',serviceSchema,'Services');