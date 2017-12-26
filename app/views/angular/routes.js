
 myApp.config(["$routeProvider",function($routeProvider){
            $routeProvider
            .when("/",{
               templateUrl : "views/home-view.html",
            })
            .when("/login",{
               templateUrl : "views/login.html",
               controller : "LoginController",
               controllerAs : "loginCtrl"
            })
      		.when("/signup",{
               templateUrl : "views/signup.html",
               controller : "SignupController",
               controllerAs : "signupCtrl"
            })
            .when("/chat",{
               templateUrl : "views/chat.html",
               controller : "HomeController",
               controllerAs : "homeCtrl"
            })
            .when("/password/forgot",{
               templateUrl : "views/forgot.html",
               controller : "ForgotController",
               controllerAs : "forgotCtrl"
            })
            .when("/password/update",{
               templateUrl : "views/updatePassword.html",
               controller : "ForgotController",
               controllerAs : "forgotCtrl"
            })
            .when('/chat/404',{

                  templateUrl: "views/my404.html"
            })
            .otherwise(
                      {
                          redirectTo:'/chat/404'
                          
                      }
                  )
          }]);