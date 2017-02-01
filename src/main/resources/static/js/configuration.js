(function () {
    "use strict";
    var app = angular.module('hello');
    app.service("Configuration", function () {
        var self = this;

            this.getStatisticsLink = function(){
                return "/statistics";
            }
            
            this.getDropdownsLink = function(statisticName){
                return "/dropDowns?statistic="+statisticName;
            }
        
            this.getStatisticLink = function(statistcName, year, country){
                return "/statistic?statistic_name="+statistcName+"&year="+year+"&country="+country;
            }
        
            this.getStatisticWithOnlyYearLink = function(statistcName, year){
                return "/statistic?statistic_name="+statistcName+"&year="+year;
            }
            
            this.addUser = function(user){
            	return "/user";
            }
            
            this.getWikidataCategoriesLink = function(){
                return "/wikiDataStatistics";
            }
            
            this.getWikidataCountriesLink = function(){
                return "/wikiDataCountries";
            }
            
            this.getWikidataEyeColorsLink = function(){
                return "/wikiDataEyeColors";
            }
            
            this.getWikiDataProfessionsLink = function(){
                return "/wikiDataProfessions";
            }
            
            this.getWikiDataStatisticLink = function(statisticName, country, eyeColor, profession){
                return "/wikiDataStatistic?statistic="+statisticName+"&eyeColor="+eyeColor+"&profession="+profession;
            }
        });
}());