(function () {

  angular
  .module('randeck')
  .controller('MainController', MainController);

  MainController.$inject = ['MainService'];

  function MainController(MainService) {
    var vm = this;
    vm.cardsRarity = 'Common Rare Epic Legendary'.split(' ');
    vm.selectedRarities = 'Common Rare Epic Legendary'.split(' ');
    vm.averageCost = 0;
    vm.selectedArena = 8;
    MainService.getCards().then(function(cards){
      vm.cards = cards.data;
      vm.generateRandomDeck();
    });

    MainService.getArenas().then(function(arenas){
      vm.arenas = arenas.data;
    });

    vm.cardInArena = function(card) {
      return card.arena <= vm.selectedArena;
    }

    vm.cardInRarity = function(card) {
      return vm.selectedRarities.indexOf(card.rarity) !== -1;
    }

    vm.generateRandomDeck = function(){
      var cards = vm.cards.filter(vm.cardInRarity);
      cards = cards.filter(vm.cardInArena);
      vm.randomDeck = MainService.shuffle(cards).slice(0, 8);
      var totalCost = vm.randomDeck
        .map(function(card){ return card.elixirCost; })
        .reduce(function(a, b){ return a + b; });
      vm.averageCost = totalCost / (8);
      vm.averageCost = Math.round(vm.averageCost * 10) / 10;
    }

    vm.toggle = function (item, list) {
      var idx = list.indexOf(item);
      if (idx > -1) {
        list.splice(idx, 1);
      } else {
        list.push(item);
      }
    };

    vm.exists = function (item, list) {
      return list.indexOf(item) > -1;
    };

  }

})();
