

myApp.controller("SignupController",["$http",'$location','$rootScope','chatService','$cookies','$window',
	function($http,$location,$rootScope,chatService,$cookies,$window){
	
	let main = this ; 

	this.firstname;
	
	this.lastname;
	this.email ;
	this.password;

	// FUNCTION TO SIGNUP USER
	this.submitSignup = function(){
	
		let signupData = {

			firstname : main.firstname,
			lastname: main.lastname,
			email: main.email,
			password: main.password
		};

		chatService.signupApi(signupData)
		.then(function successCallback(response){
			console.log(response);

			// //IF ALREADY LOGGED IN USER TRIES TO SIGN UP, GO TO LOGIN SCREEN
			// if(response.data.loggedIn == true || response.data.loggedIn != undefined){

			// 	SweetAlert.swal({
			// 	   title: "Access denied",
			// 	   text:""+response.data.message+"",
			// 	   type: "info",
			// 	   confirmButtonColor: "#de463b",confirmButtonText: "Ok",
			// 	   closeOnConfirm: true}, 
			// 		function(){ 
			
			// 	   		$location.path('/');
			
			//    	});
			
			// }

			// else{

				// IF EMAIL IS NEW > REDIRECT TO DASHBOARD
				if(response.data.status == 200 && response.data.data.alreadyPresent !== true){

					chatService.cookieValue = $cookies.get('token');

					$location.path('/chat'); 
				}

				else{
					// SweetAlert.swal({
					// 	title:"OOPS!",
					//   	text: ""+response.data.message+"",
					//    	type: "info",
					//    	showCancelButton: false,
					//    	confirmButtonColor: "#de463b",confirmButtonText: "OK!",
					//    	closeOnConfirm: true});

					 $location.path('/signup');
				}
			// }		

		}, function errorCallback(reason){
				console.log(reason);
				console.log("Error in Post");
			})
	}
}])