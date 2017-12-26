
// defining a mongoose schema 
// including the module

const mongoose = require('mongoose');

// declare schema object.
const Schema = mongoose.Schema;

const conversationSchema = new Schema({

	members:[{type:Schema.Types.ObjectId, ref: 'User'}],
	chats : [{
				message:{type:String},
				sender:{type:String}

			}]
	

},{timestamps:true});


// create the model for users and expose it to our app
module.exports = mongoose.model('Conversation', conversationSchema);
