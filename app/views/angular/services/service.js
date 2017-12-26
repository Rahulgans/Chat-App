
myApp.service("chatService",function($http){

	let main = this ;

	main.userDetails = '';

	main.userName;
	main.email;
	main.socketUser = ''; 

	// this.cookieValue ;

	// USER PROFILE PAGE
	this.homeApi = function(){
		return $http.get("/api/home");
	}
	
	// USER LOGIN
	this.loginApi = function(data){

		return $http.post("/api/login",data);
	}

	// USER SIGNUP
	this.signupApi = function(data){      

		return $http.post('/api/signup',data);
	}

	// TO SEND PASSWORD RESET EMAIL
	this.postResetApi = function(data){
	
		return $http.post('/forgotPass',data);
	}

	// TO UPDATE PASSWORD
	this.updatePasswordApi = function(info){
		return $http.post('/password/update',info);
	}

})