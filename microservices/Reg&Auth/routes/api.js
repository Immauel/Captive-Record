//Dependencies

var express= require('express');
var jsonwebtoken= require('jsonwebtoken');
var router = express.Router();


//Models


var User = require('../models/Users.js');
var Company = require('../models/Company.js');




//token
function createToken(user){

	var token=	jsonwebtoken.sign({
				name : user.name,
				email : user.email
		},"secreteKey",{expiresIn : 3600}
	);

	return token;
}

router.post('/test', function(req,res){
    res.send({message: "This is working proper"});
});

router.post('/signup',function(req,res){
    var user = new User({

        lastName: req.body.lastName,
        firstName: req.body.firstName,
        email: req.body.email,
        password:req.body.password,
        company: req.body.company,
        role: req.body.role 

    });

    console.log(user);

    user.save(function(err,usr){
        var token = createToken(user);
        
        if(err){
            res.send(err); return;
        }

        res.status(200).send({
            success: true,
            token:token,
            userId: usr._id,
            lastName: req.body.lastName,
            firstName: req.body.firstName,
            email: req.body.email,
            role: req.body.role 

        });
    });
});

router.post("/updateUserCompany",function(req,res){
    User.update({ _id: req.body.userId }, {
        $set: {
            
            company:req.body.companyId
        }
    },function(err,account){
        if(err){
            console.log(err);
            res.send({
                error: err,
                success:false
            });
        }
        else{
            console.log(account);
           res.send({

                success:true,
           });
        }
    });
});



router.post('/login',function(req,res){

    User.findOne({ email : req.body.email}).select('password').exec(function(err,user){

        if(err) throw err;
        if(!user){
            res.send({
                success:false,
                message:"User does not exists!"
            });
        }else if(user){
            var validPassword=user.comparePassword(req.body.password);

            if(!validPassword){
                    res.send({
                        success:false,
                        message: "incorrect email or password!"
                    }) 
            }
            else{
                var token = createToken(user);
                
                User.findOne({ email : req.body.email},function(err,user){
                    console.log(user);
                    res.status(200).send({
                        success: true,
                        token:token,
                        userId: user._id,
                        companyId: user.company,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email:user.email,
                        role: user.role //Owner, admin, HOD, Sale, FPI team,

                    });
                })
            }
        }
    });
})


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

//All routes after this middleware are secured
User.methods(['get','put','delete']);
User.register(router,'/users');

Company.methods(['get','put','post','delete']);
Company.register(router,'/companies');


module.exports=router;