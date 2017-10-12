//Dependencies

var express= require('express');
var router = express.Router();

var Client = require('node-rest-client').Client;

var client = new Client();

var serviceUnavailable = "This service is temporary unavailable, Try again later!";
//============================================================================================

router.post('/authenticate', function(req,res){
	var args = {
	    data: req.body,
	    headers: { "Content-Type": "application/json" }
	};
	 
	client.post("http://127.0.0.1:9992/api/login", args, function (data, response) {
	    res.send(data);
	}).on('error', function (err) {
	    console.error('Something went wrong on the client', err);
	    res.send({
	    	success:false,
	    	message:serviceUnavailable
	    });
	});
})

router.post('/addUser',function(req,res){
	var args = {
	    data: req.body,
	    headers: { "Content-Type": "application/json" }
	};
	 
	client.post("http://127.0.0.1:9992/api/signup", args, function (data, response) {
	    res.send(data);
	}).on('error', function (err) {
	    console.error('Something went wrong on the client', err);
	    res.send({
	    	success:false,
	    	message:serviceUnavailable
	    });
	});
})

router.post('/addCompany',function(req,res){
	var args = {
	    data: req.body,
	    headers: 
	    { 
	    	"Content-Type": "application/json",
	    	'x-access-token': req.body.token
	    }
	};
	 
	client.post("http://127.0.0.1:9992/api/companies", args, function (data, response) {
	   res.send(data);
	}).on('error', function (err) {
		    console.error('Something went wrong on the client', err);
		    res.send({
		    	success:false,
		    	message:serviceUnavailable
		    });
	});
});

router.post("/updateUser",function(req,res){

		var args = {
		    data: req.body,
		    headers: 
		    { 
		    	"Content-Type": "application/json",
		    	'x-access-token': req.body.token
		    }
		};
		console.log(args);
	    client.post('http://127.0.0.1:9992/api/updateUserCompany',args,function(data,response){
	   		
	   			res.send(data);
	   		
	   }).on('error', function (err) {
		    console.error('Something went wrong on the client', err);
		    res.send({
		    	success:false,
		    	message:serviceUnavailable
		    });
		});
})
 
//===========================================================================================


//gap analysis service

router.post('/questions',function(req,res){

	var args = {
	    headers: 
	    { 
	    	"Content-Type": "application/json",
	    	'x-access-token': req.body.token
	    }
	};

	client.get("http://127.0.0.1:9993/api/questions",args, function (data, response) {
    // parsed response body as js object 
     res.send(data);
    
    }).on('error', function (err) {
	    console.error('Something went wrong on the client', err);
	    res.send({
	    	success:false,
	    	message:serviceUnavailable
	    	
	    });
	});
});

router.post('/getResult',function(req,res){
	var args = {
	    data: req.body,
	    headers: 
	    { 
	    	"Content-Type": "application/json",
	    	'x-access-token': req.body.token
	    }
	};

	
	 
	client.post("http://127.0.0.1:9993/api/getResult", args, function (data, response) {
	    res.send(data);
	}).on('error', function (err) {
	    console.error('Something went wrong on the client', err);
	    res.send({
	    	success:false,
	    	message:serviceUnavailable
	    	
	    });
	});
});

router.post('/finalResults',function(req,res){
	var args = {
	    data: req.body,
	    headers: 
	    { 
	    	"Content-Type": "application/json",
	    	'x-access-token': req.body.token
	    }
	};

	
	 
	client.post("http://127.0.0.1:9993/api/finalResults", args, function (data, response) {
	    res.send(data);
	}).on('error', function (err) {
	    console.error('Something went wrong on the client', err);
	    res.send({
	    	success:false,
	    	message:serviceUnavailable
	    	
	    });
	});
});

router.post('/updateGapResult',function(req,res){
	var args = {
	    data: req.body.gapResult,
	    headers: 
	    { 
	    	"Content-Type": "application/json",
	    	'x-access-token': req.body.token
	    }
	};
	 
	client.put("http://127.0.0.1:9993/api/results/"+req.body.gapResult._id, args, function (data, response) {
	    res.send(data);
	}).on('error', function (err) {
	    console.error('Something went wrong on the client', err);
	    res.status(402).send({
	    	success:false,
	    	message:serviceUnavailable
	    });
	});
});


module.exports=router;