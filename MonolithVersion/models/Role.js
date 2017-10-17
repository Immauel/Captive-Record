var restful = require('node-restful');
var mongoose=restful.mongoose;

//Schema

var roleSchema = mongoose.Schema({
 		name: String,
 		title: String,
 		description:String,
 		capabilities:[]
});

//Return schema
module.exports = restful.model('Roles',roleSchema,'Roles');