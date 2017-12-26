

myApp.controller("HomeController",["$http",'$location','$rootScope','chatService','$cookies','$window',
	function($http,$location,$rootScope,chatService,$cookies,$window){
	
	let main = this ;

	//saving chats on chatArray
	this.chatArray = [];

	this.usersOnline =[];
	this.usersLists = false;

	//chat messages
	this.chatsText='';

	//show text messsages on condition
	this.showText = false;

	this.showScript = false;

	//user's  firstName

	let currentUser ;
	this.userName = '';
				 

		this.getHome = function(){
		
			chatService.homeApi()
			.then(function successCallback(response){
				
				console.log(response);

				if(response.data.status == 200){

					let socket = io.connect('http://localhost:3000');
					
				 	currentUser = response.data.data ;

					socket.emit('setCurrentUser',currentUser);

					socket.emit('getAllUsers');

					// socket.emit('sendUser',response.data.data);

		        	main.userName = response.data.data.firstName;

					chatService.userName = response.data.data.firstName;
					chatService.email = response.data.data.email;

					this.sendMessage = function(chats){
			
						if(main.chatArray.length > 0){

							socket.

							main.chatArray.push(chats);

							socket.emit("chatMessages",main.chatArray);

							main.showText = true ;
								
						}

						else{
							alert('No message');
						}
						
					};

					
				}

				else{

					alert('No cookie');
					$location.path('/login');
					
				}

			}, function  errorCallback(reason){
					console.log(reason);
					alert("Error in Login-Post");
			})
		};

		this.getHome();



	this.logout = function(){

		let socket = io.connect('http://localhost:3000');


		socket.emit('disconnect',currentUser);

		$cookies.remove('token');


		$location.path('/login');
	};

	
}])