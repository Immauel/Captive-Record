var restful = require('node-restful');
var bcrypt = require('bcrypt-nodejs');
var mongoose=restful.mongoose;

//Schema

var userSchema = mongoose.Schema({
 		firstName: String,
 		lastName: String,
 		email:{type: String, unique:true, required: true},
 		password:String,
 		company: {required: true, type: String},
 		role: String //Owner, admin, HOD, Sale, FPI team,
});

userSchema.pre('save', function(next){
	var user = this;

	if(!user.isModified('password')) return next();

	bcrypt.hash(user.password,null,null,function(err,hash){

		 	if(err) return next(err);

		 	user.password=hash;
		 	next();

	});

});

userSchema.methods.comparePassword=function(password){
	var user = this;
	return bcrypt.compareSync(password, user.password);
}

//Return schema

module.exports = restful.model('Users',userSchema,'Users');