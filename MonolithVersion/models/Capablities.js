var restful = require('node-restful');
var mongoose=restful.mongoose;

//Schema

var capaSchema = mongoose.Schema({
 		name: String
});

//Return schema
module.exports = restful.model('Capabilities',capaSchema,'Capabilities');