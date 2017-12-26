

const mongoose = require('mongoose');

const express = require('express');

const userRouter  = express.Router();

const userModel = require('./../../app/models/User');

const bcrypt = require('bcrypt-nodejs');

const passport = require('passport');

const jwt = require('jsonwebtoken');

let auth = require('./../../middlewares/authorization');


module.exports.controllerFunction = function(app,responseType){

	userRouter.get('/logout',function(req,res){
      
      req.session.destroy(function(err){
        
        res.redirect('/');

      });

    });

  // GET profile details

  userRouter.get('/home',auth.tokenVerify,function(req,res){
    console.log("home ran");
    

      let userId= req.decoded.id;

      userModel.findOne({"_id":userId},{password:0},function(err,user){

        if(err){
            let myResponse = responseType.generate(true,err,500,null);
                  res.send(myResponse);
        }

        else{
              // mp
            let myResponse = responseType.generate(false,"Got user",200,user);
                  res.send(myResponse);
        }
      })
  });

  // userRouter.get('/signup',function(req,res){

  //     res.render('login');
  // });
      
     // -------- API TO SIGNUP USER ---------

  userRouter.post('/signup',function(req,res){

      let signupInfo = {};

    if(req.body.firstname!=undefined && req.body.lastname!=undefined && req.body.password!=undefined && 
        req.body.email!=undefined){     

      userModel.findOne({"email":req.body.email},function(err,user){
         
          if(err){
                  let myResponse = responseType.generate(true,err,500,null);
                  res.send(myResponse);
          }
          else if(user && user!==null){
              
                signupInfo.alreadyPresent = true;

                 let myResponse = responseType.generate(false,"Email already in use",200,signupInfo);
                 res.send(myResponse);
          }

          else{
               
               let newUser = new userModel();
  
                  newUser.firstName = req.body.firstname ;
                  newUser.lastName = req.body.lastname ;
                  newUser.email = req.body.email;
                  newUser.password = newUser.generateHash(req.body.password);

                newUser.save(function(err,result){
                
                  if(err){
                        myResponse = responseType.generate(true,"Check paramaters",500,null);
                        res.send(myResponse);
                    }
                 });

                  // else{

                    let payload ={};
                    
                    payload.id = newUser._id;

                    //generate a token
                    const token = jwt.sign(payload,app.get('myTokenSecret'),{
                        expiresIn: "24h"// expires in 24 hours
                    });

                    res.cookie('token',token);


                    let myResponse = responseType.generate(false,"Token good",200,newUser);

                      res.send(myResponse);
                  //} 
          }
      })
    }

    else{

        let myResponse = responseType.generate(true,"Parameter missing",500,null);
        res.send(myResponse);
    }

  });



  //   // userRouter.get('/login',function(req,res){

  //       res.render('login');
  // });
  // ------API TO LOGIN ----------

  userRouter.post('/login',function(req,res){
     
      if(req.body.email != undefined && req.body.password != undefined){

           let mailId = req.body.email;
          
           userModel.findOne({"email":mailId}
            ,function(err,foundUser){
                  if(err){

                      res.send(err);
                  }
                  
                  else if(foundUser == null){ 
                       
                      let myResponse = responseType.generate(true,"No user found",500,null);
                          res.send(myResponse);                   
                  }

                  else if(!foundUser.validPassword(req.body.password)){

                       console.log("error working");
                      let myResponse = responseType.generate(true,"Enter valid credentials",500,null);
                          res.send(myResponse);  

                  }

                  else{   

                     let payload ={};
                    
                    payload.id = foundUser._id;

                    //generate a token
                    const token = jwt.sign(payload,app.get('myTokenSecret'),{
                        expiresIn: "24h" // expires in 24 hours
                    });

                    res.cookie('token',token);


                    let myResponse = responseType.generate(false,"Token good",200,foundUser);

                      res.send(myResponse);
                  }
          });
            
      }  

      else{

          var myResponse = responseType.generate(
            true,"Some paramater is missing",500,null);
          
          res.send(myResponse);
      }

  });

app.use('/api',userRouter);

}