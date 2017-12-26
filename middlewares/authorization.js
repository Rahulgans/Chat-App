
const express = require('express');

const app = express();

const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');

const secretToken = require('../config/jwtSecret').secret ;

const userModel = mongoose.model('User');

let responseType = require("./../libs/responseGenerator");


//	MIDDLEWARE TO Logout *LOGGED IN USER* FROM ENTERING SIGNUP PAGE 
module.exports.isLoggedIn = function(req,res,next){
	
	if(req.session.loginStatus){

		console.log("Logged in user trying to signup");
		
		req.session.destroy(function(err){
        
        	res.status(200).send({"loggedIn":true,"message":"Your session will be lost"});

      	});
	}

	else{

		next();
	}

};

// MIDDLEWARE TO CHECK IF VERIFIED-TOKEN EXISTS 

module.exports.tokenVerify = function(req,res,next){

// check  cookies for token

  let token = req.cookies.token;

  if (token) {

    // verifies secret
    jwt.verify(token,secretToken, function(err, decoded) {

	    // console.log("sshjshshshsh");

	      if (err) {
	      		console.log("error in token authentication");
	        	res.json({ success: false, message: 'Failed to authenticate token >'+""+err+"" });    
	      } else {
	      	
	      		console.log("No eror");

	        	req.decoded = decoded;
	        	console.log(decoded);
	        	next();
	      }
    });

  } else {

    // if there is no token
    // return an error
   		let myResponse = responseType.generate(true,"Not authenticated",403,null);
  		res.send(myResponse);
  }

}

// MIDDLEWARE TO CHECK IF MAIL IS SENT, ONLY THEN GIVE ACCESS TO UPDATE PASSWORD
module.exports.isMailSent = function(req,res,next){

	if(!req.session.sentMail){
		
		res.status(200).send(
			{"mailLog":false,
			"message":"Please visit forgot password screen to make this action!"
			}
		);
	}

	else{
	
		next();
	}

};
