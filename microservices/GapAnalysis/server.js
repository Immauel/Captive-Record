

var express = require('express');
var mongoose = require("mongoose");
var bodyParser=require("body-parser");


//Express
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());





//MongoDB NB: This Address can always be changed to the address of mongodb server
mongoose.connect('mongodb://localhost/Gap');

//Routes
app.use('/api',require('./routes/api.js'));

//Start Server
app.listen(9993);

console.log('Gap Analysis Service Running at port 9993...');