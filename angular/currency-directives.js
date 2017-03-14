(function(){
    var app = angular.module('currency-directives', []);

    app.directive("navbar", function() {
      return {
        restrict: 'E',
        templateUrl: "partials/navbar.html"
      };
    });

    app.directive("currencyForm", function() {
      return {
        restrict: 'E',
        templateUrl: "partials/currency-form.html"
      };
    });

     app.directive("conversions", function() {
      return {
        restrict: 'E',
        templateUrl: "partials/conversions.html"
      };
    });
    
    

    
  })();
