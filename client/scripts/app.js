var myApp = angular.module("myApp", [])

.controller("EphemerisController", ['$scope', '$http', function ($scope, $http) {

    $scope.timezoneOptions = {
        "America/Puerto_Rico" : "Puerto Rico (Atlantic)",
        "America/New_York" : "New York (Eastern)",
        "America/Chicago": "Chicago (Central)",
        "America/Denver": "Denver (Mountain)",
        "America/Phoenix": "Phoenix (MST)",
        "America/Los_Angeles": "Los Angeles (Pacific)",
        "America/Anchorage": "Anchorage (Alaska)",
        "Pacific/Honolulu": "Honolulu (Hawaii)",
        "Europe/London": "London",
        "Europe/Belgrade": "Belgrade",
        "Europe/Dublin": "Dublin",
    }
    $scope.personA = {};
    $scope.personB = {}


    $scope.personA.dateTime = {
        year : "",
        month : "",
        day : "",
        hour : "",
        minute : "",
        timezone : ""
    };

    $scope.personB.dateTime = {
        year : "",
        month : "",
        day : "",
        hour : "",
        minute : "",
        timezone : ""
    };

    // $scope.lat;
    // $scope.lon;
    $scope.personA.location = {
        lat : "",
        lon : ""
    };

    $scope.personB.location = {
        lat : "",
        lon : ""
    };

    $scope.personA.timezone = {}
    $scope.personB.timezone = {}
    
    $scope.result = '';

    $scope.getEphemeris = function () {
        $scope.personA.dateTime.timezone = $scope.personA.timezone;
        $scope.personB.dateTime.timezone = $scope.personB.timezone;
        // $scope.location = {
        //     lat : $scope.lat,
        //     lon : $scope.lon
        // }
        console.log($scope.location)
        var personA = angular.extend({}, $scope.personA.location, $scope.personA.dateTime)
        var personB = angular.extend({}, $scope.personB.location, $scope.personB.dateTime)

        var queryParams = angular.extend({}, $scope.location, $scope.dateTime)

        $http.post('/comparison', {
            personA: personA,
            personB :personB
        })
        .then(function(result){
            $scope.result = JSON.stringify(result.data, null, 2);
        })
        .catch(function(result){
            $scope.result = result.data;
        })
    }
    
}])

.directive('locationInput', LocationInput)
.directive('dateTimeInput', DateTimeInput)
.directive('timeZoneInput', TimeZoneInput)


    DateTimeInput.$inject = ['$document'];;
    LocationInput.$inject = ['$document'];
    TimeZoneInput.$inject = ['$document'];

    function LocationInput($document) {

        var template = "<div class='form-group'><label for='inputId'>{{labelText}}</label><input required placeholder='{{inputPlaceholder}}' class='form-control' id='inputId' type='text' ng-model='locationObject'></input></div>"
        
        return {
            template: template,
            scope: {
                locationObject : '=',
                inputId : '@',
                labelText : '@',
                inputPlaceholder : '@'
            },

        }

        
    }

    function DateTimeInput($document) {

        var template = "<div class='form-group'><label for='inputId'>{{labelText}}</label><input required placeholder='{{inputPlaceholder}}' class='form-control' id='inputId' type='text' ng-model='dateTimeObject'></input></div>"
        
        return {
            template: template,
            scope: {
                dateTimeObject : '=',
                inputId : '@',
                labelText : '@',
                inputPlaceholder : '@'
            },

        }

        
    }

    function TimeZoneInput($document) {

        var template = "\
        <div class='form-group'>\
            <label for='inputId'>{{labelText}}</label>\
                <select required ng-options='key as value for (key, value) in timeZoneOptions' class='form-control' id='inputId' type='text' ng-model='timeZoneObject'>\
            </select>\
        </div>"
        
        return {
            template: template,
            scope: {
                timeZoneObject : '=',
                inputId : '@',
                labelText : '@',
                timeZoneOptions : '='
            },

        }

        
    }
    