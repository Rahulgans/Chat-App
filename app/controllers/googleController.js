

const express = require('express');

const userRouter  = express.Router();

const passport = require('passport');

// json web token usage

let jwt = require('jsonwebtoken');

const auth = require('./../../middlewares/authorization');


module.exports.controllerFunction = function(app,responseGenerator){

    // Google Authentication
    // profile gets us their basic information including their name
    // email gets their emails

	userRouter.get('/auth/google/get', passport.authenticate('google', {
	 scope : ['profile', 'email'] 
	}
	));

	// the callback after google has authenticated the user
    userRouter.get('/auth/google/callback',passport.authenticate('google', {
                    failureRedirect : '/login'
    		},function(req,res){

                let payload ={};
                payload.id = req.user._id ;

                //generate a token
                const token = jwt.sign(payload,app.get('myTokenSecret'),{
                    expiresInMinutes: 1440 // expires in 24 hours
                });

                res.cookie('token',token);
                // console.log(req.user)

                let myResponse = responseGenerator.generate(false,"Token good",200,token);

                res.send(myResponse);
    		})
    );

    app.use("/api",userRouter);
};