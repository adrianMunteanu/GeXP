var app = angular.module('hello');

app.controller('home', ['$scope', '$http', '$window', '$rootScope', "Sync", function ($scope, $http, $window, $rootScope, Sync) {
	
    localStorage.clear();
    var self = this;
    
    this.showDropdowns = false;
    self.selectedCountry = "Select Country";
    self.selectedStatistic = "Select Statistic";
    self.selectedYear = "Select Year";
    self.singleMaleResults = null;
    self.singleFemaleResult = null;
    self.stat = [];
    this.showMap = false;
    this.prop = 1;
    
    var initialize = function(){
        console.log("initialize");
        Sync.getStatistics(function(data){
            self.statistics = data;
            console.log(data);
        });
    };
    
    this.populateDropdowns = function(){
        Sync.populateDropdowns(self.selectedStatistic, function(data){
            self.years = data.years;
            self.countries = data.countries;
            console.log(data);
        });
    };
	
    this.selectStatistic = function(){
    	console.log(self.selectedCountry);
        if(self.selectedCountry){
            Sync.getStatistic(self.selectStatistic, self.selectedYear, self.selectedCountry, function(data){
            	console.log(data);
                localStorage.setItem("countries", self.selectedCountry);
                self.singleMaleResults = data[0].male_result;
                self.singleFemaleResult = data[0].female_results;
            });
        }
        else{
            Sync.getStatisticWithOnlyYear(self.selectStatistic, self.selectedYear, function(data){
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
                 localStorage.setItem("countries", self.countries);
                 localStorage.setItem("men", male_result);
                 localStorage.setItem("female", female_result);
                
            });
        }
        if(self.showMap === true){
            this.prop++;
        }
        
       
        
        self.showMap = true;
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
}]);