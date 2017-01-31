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
        });
}());