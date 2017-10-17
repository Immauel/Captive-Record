//Dependencies

var express= require('express');
var jsonwebtoken= require('jsonwebtoken');
var router = express.Router();


var Client = require('node-rest-client').Client;

var client = new Client();

var GapQuestions = require('../models/GapQuestions.js');
var GapResults = require('../models/GapResult.js');



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


//All routes after this middleware are secured
User.methods(['get','put','delete']);
User.register(router,'/users');

Company.methods(['get','put','post','delete']);
Company.register(router,'/companies');

router.post('/getResult',function(req,res){
    GapResults.findOne({companyId:req.body.companyId},function(err,result){
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
            if(result==null){
                var newResult = new GapResults({
                    companyId: req.body.companyId,
                    gapProgress: 0
                });

                newResult.save(function(err,savedResult){
                    res.send(savedResult);

                    console.log(savedResult);
                   
                });
            }
            else{
                res.send(result);
                
                console.log(result);
            }
        }
    })
});

router.post('/finalResults',function(req,res){
    GapResults.findOne({companyId:req.body.companyId},function(err,result){

        
        
        //exception handling
        if(err){
             console.log(err);
             res.send(err);
        }else{
           //this is the final results to be sent to a client

            var fresults =[];
            var preResults = result.results;


            for(var i=0;i<preResults.length;i++){
                //this will store the current result in the fresult list
                var currentFResult ={};

                //Initialising the current result.
                currentFResult.purpose = preResults[i].purpose;
                currentFResult.qnumber = preResults[i].qnumber;

                //calculating the overall for the current result
                var answers = preResults[i].ans;
                var overall = 0;
                var score =0;
                for(var a =0;a<answers.length;a++){

                    if(answers[a].value =='yes'){
                        score = score+1;
                    }
                }
                //Calculating the overall percentages
                overall = (score/answers.length)*100;

                currentFResult.overall = overall;

                fresults[i] = currentFResult;

            }

            res.send(fresults) 
        }
        


    });
})



//This automatically creates a RESTAPI
GapQuestions.methods(['get','put','post','delete']);
GapQuestions.register(router,'/questions');


GapResults.methods(['get','put','post','delete']);
GapResults.register(router,'/results');

module.exports=router;