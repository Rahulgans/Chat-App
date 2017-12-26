
const mongoose = require('mongoose');

const userModel = mongoose.model('User');

const chatModel = mongoose.model('Conversation');

const eventEmitter = require('events').EventEmitter ;

let emitter = new eventEmitter();


module.exports.socketDetails = function(app,io,responseType){

	let userList = [];
	let currentUsers = {};

	io.on('connection',function(socket){
			
		
		console.log("userlist");
		console.log(userList);

		// console.log('sockets connected');
		// console.log(io.sockets.sockets);

		socket.on('setCurrentUser',function(currentUser){

				socket.activeUsers = userList;

			console.log("user connected is" + currentUser.firstName);

			// array.some() to check if user already present in userlist --to prevent adding on reload
			let ifUserPresent = userList.some(function(elem){

	           	return elem.email === currentUser.email;
// 
	 	      });

			if(!ifUserPresent){

				currentUsers.email = currentUser.email;
				currentUsers.name = currentUser.firstName;
				currentUsers.id = currentUser._id;

				console.log(currentUsers);

				socket.activeUsers.push(currentUsers);
				console.log("users are "); 
				// console.log(socket.activeUsers);

			}
		
		})

		socket.on('getAllUsers',function(){

			emitter.emit('getUsersFromDatabase');
		})

		socket.on("sendUser",function(users){

			console.log(users.email+ " connected");
		})



		// ----socket.on listens for all events from client side --------

		socket.on('chatMessages',function(chatTexts){

			emitter.emit('saveChat',chatTexts);

			//socket.broadcast sends data to all clients except the one who sends it

			//io.emit sends message to all clients

			io.emit('toMessage',chatTexts);

			// console.log(chatTexts);
			
		})

		let sendUsers = function(allUsers){


		}

		emitter.on('getUsersFromDatabase',function(){

			userModel.find({},{password:0,lastName:0},function(err,users){

				if(err){
					console.log("error is "+err);
				}

				else{

					// console.log("Database users")
					sendUsers(users);
					// console.log(users);
				}
			});
		})
		emitter.on('saveChat',function(){

		})

		 socket.on('disconnect', function(user){ 

		 	console.log(user);
   			console.log(user.firstName +' disconnected');

   			for(let i in socket.activeUsers){

   				if(socket.activeUsers[i].email === user.email){

   					socket.activeUsers.splice(i,1);
   				}
   			}

   			console.log("remaining users are");
   			console.log(socket.activeUsers);
   		});  
	});

}