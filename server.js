
const express = require('express');

const app = express();

const mongoose = require('mongoose');

// to log all interactions

const logger = require('morgan');

const server = require('http').createServer(app);

// socket.io initialization
const io = require('socket.io').listen(server);

const session = require('express-session');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const passport = require('passport');

// standard response format library
let responseType = require("./libs/responseGenerator");


app.use(logger('dev'));

app.use(bodyParser.json({limit:'10mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}));
app.use(cookieParser());


//built-in Node-module to get path.No installation required
const path = require("path");

// app.set("view engine", "ejs");

// accessing public directory
app.use(express.static(__dirname +'/app/views'));

// SETTING TOKEN SECRET

let tokenSecret = require('./config/jwtSecret').secret;

app.set("myTokenSecret",tokenSecret);

//Establishing database connection

// USING MLAB'S DATABASE ACCOUNT -For HEROKU Purpose
// let dbPath = "mongodb://rahul09:rahul@ds133296.mlab.com:33296/shopcart";

let dbPath = "mongodb://localhost/chatapp";
db = mongoose.connect(dbPath);

mongoose.connection.once('open',function(){
	console.log(dbPath);
	console.log("Success! Database connection open");
});


// fs module, by default module for file management in nodejs
const fs = require('fs');

// include all our model files
fs.readdirSync('./app/models').forEach(function(file){
	// check if the file is js or not
	if(file.indexOf('.js'))
		// if it is js then include the file from that folder into our express app using require
		require('./app/models/'+file);

});// end for each


// passing app and io instances to socketDetails file
require('./config/socketDetails').socketDetails(app,io,responseType);


// initializing passport 
require('./config/passport')(passport)

// passport.initialize middleware is invoked on every request. 
// It ensures the session contains a passport.user object, which may be empty.
app.use(passport.initialize());

// app.use(passport.session());

// include controllers
fs.readdirSync('./app/controllers').forEach(function(file){
	if(file.indexOf('.js')){
		// include a file as a route variable
		let route = require('./app/controllers/'+file);

		//call controller function of each file and pass your app instance and response format to it
		route.controllerFunction(app,responseType);

	}

});//end for each




app.get('*',function(request,response,next){
		
	response.status = 404 ;

	//similar to next(err) i.e calling error

	next("Error in path");
});


//Error handling Middleware

app.use(function(err,req,res,next){
	console.log("Custom Error handler used");
	if(res.status == 404){
		res.send("Invalid Path. Kindly make sure your URL is right");
	}
	else{
		res.send(err);
	}
});  

// PORT DECLARATION
const port = process.env.PORT || 3000 ;


server.listen(port, function () {
  console.log('Example app listening on port 3000!');
});
