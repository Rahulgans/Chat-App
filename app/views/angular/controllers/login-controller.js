

myApp.controller("LoginController",["$http",'$location','$rootScope','chatService','$cookies','$window',
	function($http,$location,$rootScope,chatService,$cookies,$window){
	
	var main = this ; 

	this.email ;
	this.password;


	// socket.on('message', function(message) {
 //        alert('The server has a message for you: ' + message);
 //    });

	// HIDING NAVBAR-links FOR LOGIN-PAGE
	// $rootScope.showHome = false; 
	// $rootScope.showCart = false; 
	// $rootScope.showLogout = false;  

	this.submitLogin = function(){

		var loginData = {

			email: main.email,
			password:main.password
		}

		chatService.loginApi(loginData)
		.then(function successCallback(response){
			console.log(response);

			if(response.data.status == 200){
				
				chatService.cookieValue = $cookies.get('token');
				
				$location.path('/chat');

			}

			else{

				// SweetAlert.swal({
				// 	title:"OOPS!",
				//   	text: ""+response.data.message+"",
				//    	type: "error",
				//    	showCancelButton: false,
				//    	confirmButtonColor: "#de463b",confirmButtonText: "Got it!",
				//    	closeOnConfirm: true});
				
			}


			}, function  errorCallback(reason){
				console.log(reason);
				alert("Error in Login-Post");
			})
	};

	
}])