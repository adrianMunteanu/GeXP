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
        Sync.populateDropdowns(self.selectedStatistic.identifier, function(data){
            self.years = data.years;
            self.countries = data.countries;
            console.log(data);
        });
    };
	
    this.selectStatistic = function(){
    	console.log(self.selectedStatistic);
        if(self.selectedCountry != "Select Country"){
            Sync.getStatistic(self.selectedStatistic.identifier, self.selectedYear, self.selectedCountry, function(data){
            	console.log(data);
                localStorage.setItem("countries", data[0].country);
                localStorage.setItem("men", data[0].male_result);
                localStorage.setItem("female", data[0].female_result);
                self.showMap = true;
                self.prop++;
            });
        }
        else{
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
                 self.prop++;
                
            });
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
}]);