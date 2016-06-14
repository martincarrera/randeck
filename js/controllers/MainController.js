(function () {

  angular
  .module('randeck')
  .controller('MainController', MainController);

  MainController.$inject = ['MainService'];

  function MainController(MainService) {
    var vm = this;
    vm.cards = MainService.getCards();
    vm.arenas = MainService.getArenas();
  }

})();
