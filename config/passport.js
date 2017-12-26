

const mongoose = require('mongoose');

const passport = require('passport');

//Startegy is a constructor present inside strategy.js file

// const LocalStrategy = require("passport-local").Strategy ;

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

let secretConfig = require('./oauthSecret');

let userModel = require('../app/models/User');


// expose this function to our app using module.exports
module.exports = function(passport){


	// serialize the object when user is being sent by strategies
	passport.serializeUser(function(user,done){
			
			done(null,user.id);
		
	});

	//deserailize function stores the entire user object in req.user
	// It sort of takes care of revisits of the user after logging in
	passport.deserializeUser(function(id,done){

		userModel.findById({"_id":id},function(err,user){
		
			done(null,user);
		
		})
	});
	   
	// --------- GOOGLE AUTHENTICATION STRATEGY -------

	passport.use('google',new GoogleStrategy({
	   	
	   	clientID        : secretConfig.googleAuth.clientID,
        clientSecret    : secretConfig.googleAuth.clientSecret,
        callbackURL     : secretConfig.googleAuth.callbackURL,

	  },
	  function(token,refToken, profile, done){

	    console.log(token);

	    // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {

	    	//Search for user with concerned profile-ID
	    	userModel.findOne({"google.id":profile.id},function(err,user){

		    	if(err){

		    		return done(err);
		    	}

		    	else if(user){
		    		
		    		// If user present, then log them in
		    		return done(null,user);

		    	}

		    	else{
		    		
		    		// if the user isnt in our database, create a new user
                    let newUser  = new userModel();
                    console.log("profile");
                    console.log(profile);

                    newUser.id    = profile.id;
                    newUser.token = token;
                    newUser.firstName  = profile.givenName;
                     newUser.lastName  = profile.familyName;
                    newUser.email = profile.emails[0].value; // pull the first email
                              
                    newUser.save(function(err,finalResult) {
                        if (err){
                            throw err;
                        }

                        return done(null, newUser);
                    });
                }
		    	
		    })
	   	}); // process.nextTick ends
	}))
};