
// defining a mongoose schema 
// including the module

const mongoose = require('mongoose');

const bcrypt = require('bcrypt-nodejs');

// declare schema object.
const Schema = mongoose.Schema;


const userSchema = new Schema({

	firstName  			: {type:String,default:''},
	lastName  			: {type:String,default:''},
	email	  			: {type:String,default:'',required:true},
	password			: {type:String,default:''},
	googleId            : {type:String,default:''},
	googleToken         : {type:String,default:''},

},{timestamps:true});

	// Hashing passwords using bcrypt

     userSchema.methods.generateHash = function(password) {
     	return  bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
     };
    

     userSchema.methods.validPassword = function(password) {
     	return bcrypt.compareSync(password, this.password);
     };


// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
