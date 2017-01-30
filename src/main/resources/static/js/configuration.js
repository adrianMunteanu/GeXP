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
                return "/statistics?statistic="+statistcName+"&year="+year+"&country="+country;
            }
        
            this.getStatisticWithOnlyYearLink = function(statisticname, year){
                return "/statistics?statistic="+statistcName+"&year="+year;
            }
        });
}());