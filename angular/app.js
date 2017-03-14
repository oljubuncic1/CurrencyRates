(function() {
  var app = angular.module('currencyRates', ['currency-directives']);

  app.controller('CurrencyController', ["$http", function($http){
    var cur = this;
    cur.rates = [];
    cur.conversionKeys = [];
    cur.conversionRates = [];
    cur.selectedItem = null;
    $http.get('http://api.fixer.io/latest').success(function(data){

        cur.rates = Object.keys(data['rates']);
        cur.rates.unshift('EUR');
        cur.selectedItem = cur.rates[0]; // EUR
        cur.getConversions();
        
    });

    this.getConversions = function() {

      $http.get('http://api.fixer.io/latest?base=' + cur.selectedItem).success(function(data){
          cur.conversionKeys = Object.keys(data['rates']);
          cur.conversionRates = data['rates'];

       
        
    });

      
    };

    this.saveJSON = function () {

      

    data = cur.conversionRates;

  
    filename = cur.selectedItem + 'ConversionRates.json';
  

  if (typeof data === 'object') {
    data = JSON.stringify(data, undefined, 2);
  }

  var blob = new Blob([data], {type: 'text/json'});

  // FOR IE:

  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, filename);
  }
  else{
      var e = document.createEvent('MouseEvents'),
          a = document.createElement('a');

      a.download = filename;
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
      e.initEvent('click', true, false, window,
          0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e);
  }
};

  }]);

 
})();