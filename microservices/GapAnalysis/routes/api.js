//Dependencies

var express= require('express');
var jsonwebtoken= require('jsonwebtoken');
var router = express.Router();


//Models


var GapQuestions = require('../models/GapQuestions.js');
var GapResults = require('../models/GapResult.js');








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