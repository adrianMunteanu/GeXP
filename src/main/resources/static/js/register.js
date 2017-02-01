var app = angular.module('hello');

app.controller('register', ['$scope', '$http', '$window', '$rootScope', function ($scope, $http, $window, $rootScope) {
	
	this.showError = false;
	
	this.register = function(){
		if(this.username === undefined || this.password === undefined){
			this.showError = true;
			this.errorMessage = "Please complete the username and the password.";
		}
		else if(this.password !== this.confirmPassword){
			this.showError = true;
			this.errorMessage = "Passwords don't match!";
		}
//		else if(validateEmail(this.email) === false){
//			this.showError = true;
//			this.errorMessage = "Please provide a valid e-mail adres!";
//		}
		else{
			this.showError = false;
			console.log("Login successful: " + this.username + " " + this.password)
		}
		var dataObj = {
				username : this.username,
				password : this.password
		};
		console.log(dataObj)
//		 $http.post('/users').success(function (dataObj) {
//			 $window.location.href = '/home.html';
//		    }).error(function (data) {
//		    	this.showError = true;	
//		    	this.errorMessage = "Something went wrong.";
//		    });
		console.log({"username":this.username, "password":this.password , "enabled":1});
		$http({
            method : 'POST',
            url    : "/users",
            data   : {"username":this.username, "password":this.password , "enabled":1},
            headers :{'Content-Type':'application/json'}
    })
    .success(function(data){
    	 $window.location.href = '/home.html';
     })
     .error(function(data){
            alert("error");
        });

		
	}
	
	
	function validateEmail(email) {
	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email);
	}
	
}]);