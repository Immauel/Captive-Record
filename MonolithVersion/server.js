/* ===================================================== 
 *  AUTHOR : IMMANUEL FRANSISKUS 
 *  RECORD INFORMATION MANAGEMENT (RIM)
 *  EMAIL: immanuel@rimnamibia.com.na
 *  VERSION: 1.0
 =======================================================
 */


//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var logger = require('morgan'); 
var mongoose = require("mongoose");
var app = express(); 

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(logger('dev'));  


//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});


mongoose.connect('mongodb://localhost/CaptiveRecord');

//Routes
app.use('/api',require('./routes/api.js'));

//Pages
app.use(express.static(__dirname+"/public"));

let PORT = 7777;

var server = app.listen(PORT, function () {
    console.log('Server is running.. At port '+PORT);
});