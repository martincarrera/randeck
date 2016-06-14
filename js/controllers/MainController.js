(function () {

  angular
  .module('randeck')
  .controller('MainController', MainController);

  MainController.$inject = ['MainService'];

  function MainController(MainService) {
    var vm = this;
    MainService.getCards().then(function(cards){
      vm.cards = cards.data;
    });
    MainService.getArenas().then(function(arenas){
      vm.arenas = arenas.data;
    });
  }

})();
