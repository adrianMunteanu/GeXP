(function () {
    "use strict";
     var app = angular.module('hello');
    app.service("Sync", ["$http", "Configuration", function ($http, Configuration) {

        var registerGetRequest = function (url, cb) {
            $http.get(url).success(function (data) {
                cb(data);
            });
        };
            
        var registerPostRequest = function (url, data, cb, errorCb) {
            $http.post(url, JSON.stringify(data)).success(function (data) {
                cb(data);
            }).error(function (data, status, headers, config ) {
                errorCb(data, status);
            });
        };

        this.getStatistics = function(cb){
            console.log("sync");
            var url = Configuration.getStatisticsLink();
            registerGetRequest(url,cb);
        }
        
        this.populateDropdowns = function(statisticName, cb){
            var url = Configuration.getDropdownsLink(statisticName);
            registerGetRequest(url, cb);
        }
        
        this.getStatistic = function(statisticName, year, country, cb){
            var url = Configuration.getStatisticLink(statisticName, year, country);
            registerGetRequest(url, cb);
        }
        
        this.getStatisticWithOnlyYear = function(statisticName, year, cb){
            var url = Configuration.getStatisticWithOnlyYearLink(statisticName, year);
            registerGetRequest(url, cb);
        }
        
    }]);
}());