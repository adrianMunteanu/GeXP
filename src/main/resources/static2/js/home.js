var app = angular.module('hello');

app.controller('home', ['$scope', '$http', '$window', '$rootScope', function ($scope, $http, $window, $rootScope) {
	

	 var self = this;
	 
	 $http.get('/countries').success(function (data) {
	        self.countries = data;
	    }).error(function (data) {

	    });
	
    this.selectedCountry = "Select Country";
    
    this.selectedStatistic = {
    		Id:0,
    		Name:"Select Statistic"
    };
	
    this.selectedYear = "Select Year";
	
    this.changeCountry = function(country){
    	this.selectedCountry = country;
    }
    
    this.changeStatistic = function(statistic){
    	this.selectedStatistic = statistic;
    }
    
    this.changeYear = function(year){
    	this.selectedYear = year;
    }
    
	this.statistics = [
		{
			Id:1,
			Name: "Life Expectancy"
		},
		{
			Id:2,
			Name: "Mortality Rate"
		},
		{
			Id:3,
			Name:"Blood Presure"
		}
		]
	
	this.years = [2016, 2015, 2014];
	
}]);