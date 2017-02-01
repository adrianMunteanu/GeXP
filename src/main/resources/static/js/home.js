var app = angular.module('hello');

app.controller('home', ['$scope', '$http', '$window', '$rootScope', "Sync", function ($scope, $http, $window, $rootScope, Sync) {
	
    localStorage.clear();
    var self = this;
    
    this.showDropdowns = false;
    self.selectedCountry= "Select Country";
    self.selectedStatistic={};
    self.selectedStatistic.identifier = "Select Statistic";
    self.selectedYear = "Select Year";
    self.singleMaleResults = null;
    self.singleFemaleResult = null;
    self.stat = [];
    self.text = "";
    this.showMap = false;
    this.prop = 1;
    this.showChart = false;
    
    var initialize = function(){
        console.log("initialize");
        Sync.getStatistics(function(data){
            self.statistics = data;
            var defaultData = {
            		identifier: "Select Statistic"
            }
            
            self.statistics.unshift(defaultData);
        });
    };
    
    this.populateDropdowns = function(){
        Sync.populateDropdowns(self.selectedStatistic.identifier, function(data){
            self.years = data.years;
            self.countries = data.countries;
            var defaultDataCountry = "Select Country"
            var defaultDataYear = "Select Year"
            self.countries.unshift(defaultDataCountry);
            self.years.unshift(defaultDataYear);
        });
    };
    
	this.logout = function() {
		$http.post('/users/logout', {}).then(function successCallback(response) {
			alert('aicisa')
			$rootScope.authenticated = false;
			
			 $window.location.href = '/';
    	  }, function errorCallback(response) {
    		  console.log(response);
//				self.authenticatedUser = response;
    	  });
	}
    $http({
    	  method: 'GET',
    	  url: '/users'
    	}).then(function successCallback(response) {
    		console.log(response);
			self.authenticatedUser = response.data;
    	  }, function errorCallback(response) {
    		  console.log(response);
//				self.authenticatedUser = response;
    	  });
	
	
    this.selectStatistic = function(){
    	console.log(self.selectedStatistic);
        if(self.selectedCountry != "Select Country"){
            Sync.getStatistic(self.selectedStatistic.identifier, self.selectedYear, self.selectedCountry, function(data){
            	console.log(data);
            	this.myCountry = self.selectedStatistic;
            	this.myYear = self.selectedYear;
            	if(data[0] !== null){
            		this.singleCountry = data[0].country;
            		this.singleMale = data[0].male_result;
            		this.singleFemale = data[0].female_result;

                    localStorage.setItem("countries", data[0].country);
                    localStorage.setItem("men", data[0].male_result);
                    localStorage.setItem("female", data[0].female_result);
                    self.showMap = false;
                    self.showChart = true;
                    self.prop++;

                    func();
            	}
                
            });
        }
        else{
        	if(self.selectedYear != "Select Year"){
            Sync.getStatisticWithOnlyYear(self.selectedStatistic.identifier, self.selectedYear, function(data){
            	console.log(data);
                self.stat = data;
                var actualCountries = [];
                var menStat = [];
                var femaleStat = [];
                
                for(var i=0; i< data.length; i++){
                    actualCountries.push(data[i].country);
                    menStat.push(data[i].male_result);
                    femaleStat.push(data[i].female_result);
                }
                console.log(actualCountries);
                 localStorage.setItem("countries", actualCountries);
                 localStorage.setItem("men", menStat);
                 localStorage.setItem("female", femaleStat);
                 self.showMap = true;
                 self.showChart = false;
                 self.prop++;
            });
        }
       
        }
       
        console.log("showmap");
        
    };
    
    this.changeCountry = function(country){
    	this.selectedCountry = country;
    }
    
    this.changeStatistic = function(statistic){
    	this.selectedStatistic = statistic;
    	this.populateDropdowns();
    	this.showDropdowns = true;
    }
    
    this.changeYear = function(year){
    	this.selectedYear = year;
    }
	
    initialize();
    
    this.aux = "";
    
    var func = function(){
    	console.log(this.myCountry);
    	if(this.myCountry !== undefined){
    		this.aux = this.myCountry.long_description;
    	}
    	this.singleCountry = localStorage.getItem("countries");
    	this.singleMale = localStorage.getItem("men");
    	console.log(this.singleMale);
    	this.singleFemale = localStorage.getItem("female");
	    Highcharts.chart('container', { 
	        chart: {
	            plotBackgroundColor: null,
	            plotBorderWidth: null,
	            plotShadow: false,
	            type: 'pie'
	        },
	        title: {
	            text: this.aux + this.myYear
	        },
	        tooltip: {
	            pointFormat: this.singleCountry + ' {series.name}: <b>{point.y}</b>'
	        },
	        plotOptions: {
	            pie: {
	                allowPointSelect: true,
	                cursor: 'pointer',
	                dataLabels: {
	                    enabled: true,
	                    format: '<b>{point.name}</b>: {point.y}',
	                    style: {
	                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
	                    }
	                }
	            }
	        },
	        series: [{
	            name: 'Brands',
	            colorByPoint: true,
	            data: [{
	                name: 'Males',
	                y: parseFloat(this.singleMale)
	            },
	            {
	                name: 'Females',
	                y: parseFloat(this.singleFemale)
	            }]
	        }]
	    });
    }
    
    func();
    
}]);