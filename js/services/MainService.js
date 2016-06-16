angular.module('randeck').factory('MainService', function($http) {

    return {
        getArenas : function() {
            return $http.get('http://www.clashapi.xyz/api/arenas');
        },
        getCards : function() {
            return $http.get('http://www.clashapi.xyz/api/cards');
        },
        shuffle : function(array) {
          var temporaryValue, randomIndex, currentIndex = array.length;
          while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
          }
          return array;
        },
    }

});
