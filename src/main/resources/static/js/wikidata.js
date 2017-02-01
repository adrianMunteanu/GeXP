var app = angular.module('hello');

app.controller('wikidata', ['$scope', '$http', '$window', '$rootScope', "Sync", function ($scope, $http, $window, $rootScope, Sync) {
	
    localStorage.clear();
    var self = this;
    this.prop = 1;
    self.selectedCategory = {};
    self.selectedCategory.identifier = "Select Category";
    self.selectedEyeColor = {};
    self.selectedEyeColor.name = "Select Eye Color";
    self.selectedProfession = {};
    self.selectedProfession.name = "Select Profession";
    
    var initialize = function(){
        Sync.getWikidataCategories(function(data){
            self.statistics = data;
            var defaultData = {
            		identifier: "Select Category"
            }
            self.statistics.unshift(defaultData);
        });
        Sync.getWikidataEyeColors(function(data){
            self.eyeColors = data;
            var defaultData = {
            		name: "Select Eye Color"
            }
            self.eyeColors.unshift(defaultData);
        });
        Sync.getWikidataProfessions(function(data){
            self.professions = data;
            var defaultData = {
            		name: "Select Profession"
            }
            self.professions.unshift(defaultData);
        });
    };
   
	
    this.changeCategory = function(category){
    	this.selectedCategory = category;
    }
    
    this.changeEyeColor = function(eyeColor){
    	this.selectedEyeColor = eyeColor;
    }
    
    this.changeProfession = function(prof){
    	this.selectedProfession = prof;
    }
	
    this.selectStatistic = function(){
        Sync.getWikidataStatistic(self.selectedCategory.identifier, self.selectedEyeColor.code, self.selectedProfession.code, function(data){
        	console.log(data);
            self.stat = data;
            var actualCountries = [];
            var menStat = [];
            var femaleStat = [];
            
            for(var i=0; i< data.maleResults.length; i++){
                actualCountries.push(data.maleResults[i].country);
                menStat.push(data.maleResults[i].rezultat);
            }
            
            for(var i=0; i< data.femaleResults.length; i++){
                femaleStat.push(data.femaleResults[i].rezultat);
            }
            
             localStorage.setItem("countries", actualCountries);
             localStorage.setItem("men", menStat);
             localStorage.setItem("female", femaleStat);
             self.showMap = true;
             this.showChart = false;
             self.prop++;
        });
};
    initialize();
}]);