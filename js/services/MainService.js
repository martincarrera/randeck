angular.module('randeck').factory('MainService', function($http) {

    return {
        getArenas : function() {
            return $http.get('http://clashapi.xyz/api/arenas');
        },
        getCards : function() {
            return $http.get('http://clashapi.xyz/api/cards');
        },
    }

});
