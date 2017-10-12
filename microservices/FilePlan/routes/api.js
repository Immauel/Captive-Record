//Dependencies

var express= require('express');
var jsonwebtoken= require('jsonwebtoken');
var router = express.Router();


//Models


var Ads = require('../models/Ads.js');




//token
function createToken(user){

	var token=	jsonwebtoken.sign({
				id : user._id,
				name : user.lname,
				cellphone : user.cellphone
		},"secreteKey",{expiresIn : 3600}
	);

	return token;
}

router.get('/test', function(req,res){
    console.log(req);
    res.send("This application is working");
});

router.use(function(req,res,next){
    		var token= req.body.token||req.param('token') || req.headers['x-access-token'];

    		if(token){
    			jsonwebtoken.verify(token, "secreteKey", function(err,decoded){
    				if(err){
    						res.status(403).send({success:false, message:'access dinied'});
    				}else{
    					req.decoded = decoded;
    					next();
    				}

    			});

    		}else{
    			res.status(403).send({success:false, message:'no token provided'});
    	}
});


module.exports=router;