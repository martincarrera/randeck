(function () {

  angular
  .module('randeck')
  .controller('MainController', MainController);

  MainController.$inject = ['MainService'];

  function MainController(MainService) {
    var vm = this;
    vm.options = {};
    MainService.getCards().then(function(cards){
      vm.cards = cards.data;
      vm.generateRandomDeck();
    });
    MainService.getArenas().then(function(arenas){
      vm.arenas = arenas.data;
    });

    vm.generateRandomDeck = function(){
      vm.randomDeck = vm.shuffle(vm.cards).slice(0, 8);
    }

    vm.shuffle = function(array) {
      var temporaryValue, randomIndex, currentIndex = array.length;
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }
  }

})();
