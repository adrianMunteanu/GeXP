var app = angular.module('hello');

app.directive('myMap', function() {
    // directive link function
    var link = function(scope, element, attrs) {
        var map, infoWindow;
        var markers = [];
        
        // map config
        var mapOptions = {
            center: new google.maps.LatLng(50, 2),
            zoom: 4,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false
        };
        
        // init the map
        function initMap() {
            if (map === void 0) {
                map = new google.maps.Map(element[0], mapOptions);
            }
        }    
        
        // place a marker
        function setMarker(map, position, title, content) {
            var marker;
            var markerOptions = {
                position: position,
                map: map,
                title: title,
                icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
            };

            marker = new google.maps.Marker(markerOptions);
            markers.push(marker); // add marker to array
            
            google.maps.event.addListener(marker, 'click', function () {
                // close window if not undefined
                if (infoWindow !== void 0) {
                    infoWindow.close();
                }
                // create new window
                var infoWindowOptions = {
                    content: content
                };
                infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                infoWindow.open(map, marker);
            });
        }
        
        geocoder = new google.maps.Geocoder();

        function getCountry(country, countryStatistic) {
            geocoder.geocode( { 'address': country }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                   var marker = new google.maps.Marker({
                       map: map,
                       position: results[0].geometry.location,
                       title: country
                   });
                    google.maps.event.addListener(marker, 'click', function () {
                    // close window if not undefined
                    if (infoWindow !== void 0) {
                        infoWindow.close();
                    }
                    // create new window
                    var infoWindowOptions = {
                        content: countryStatistic
                    };
                    infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                    infoWindow.open(map, marker);
                });
                }
                else if(status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT){
                    setTimeout(function() {
                        getCountry(country, countryStatistic);
                    }, 100);
                }else{
                    console.log("Geocode was not successful for the following reason:" + status);
                }
            });
        }

        // show the map and place some markers
        initMap();
        
        var countries = localStorage.getItem('countries');
        var menStat = localStorage.getItem('men');
        var femaleStat = localStorage.getItem('female');
        //var countriesArray = countries.split(',');
        for(var i=0; i<countries.length; i++){
            getCountry(countries[i], "Number of men: " + menStat[i] + ", number of female: " + femaleStat[i]);
        }
        console.log("markers set");
        
        scope.$watch("typeId",function(newValue,oldValue) {
            var countries = localStorage.getItem('countries');
            var menStat = localStorage.getItem('men');
            var femaleStat = localStorage.getItem('female');
            //var countriesArray = countries.split(',');
            for(var i=0; i<countries.length; i++){
               getCountry(countries[i], "Number of men: " + menStat[i] + ", number of female: " + femaleStat[i]);
            };
        });
    };
    
    return {
        restrict: 'A',
        template: '<div id="gmaps"></div>',
        replace: true,
        scope:{typeId:'@'},
        link: link
    };
});

