	
	myApp.directive("messageDiv",function(){

		return {

			restrict : "E" ,
			templateUrl : "views/message-template.html",
			controller : function($scope){

		
		}
	}})

	 //Directive for adding divs
    myApp.directive("adddivs", function($compile){
        return function(scope, element){
            element.bind("click", function(){
                angular.element(document.getElementById('space-for-buttons')).append($compile("<div ng-include='/xyz.html'></div>")(scope));
            });
        };
    });


// directive for loading external js file

myApp.directive('insertScript', function(){

	let addScript = function(element) {
        let scriptTag = angular.element(document.createElement('script'));
        scriptTag.attr('charset', 'utf-8');
        scriptTag.attr('src', '../js/chatScript.js');
        scriptTag.attr('type', 'text/javascript');
        element.append(scriptTag);
    };

    return {
    	controller : function($scope){
    		console.log($scope.userName);
		},
        link: function(scope, element) {
        	
            addScript(element);
        }
    }

})

    
