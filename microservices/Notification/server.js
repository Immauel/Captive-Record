

var express = require('express');
var mongoose = require("mongoose");
var bodyParser=require("body-parser");


//Express
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());





//MongoDB NB: This Address can always be changed to the address of mongodb server
mongoose.connect('mongodb://localhost/FilePlan');



//Routes
app.use('/api',require('./routes/api.js'));

//Pages
app.use(express.static(__dirname+"/public"));


//Start Server
app.listen(9991);

console.log('File Plan Service Running at port 9991...');