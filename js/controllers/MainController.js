(function () {

  angular
  .module('randeck')
  .controller('MainController', MainController);

  MainController.$inject = ['MainService'];

  function MainController(MainService) {
    var vm = this;
    vm.cardsRarity = 'Common Rare Epic Legendary'.split(' ');
    vm.selectedRarities = 'Common Rare Epic Legendary'.split(' ');
    MainService.getCards().then(function(cards){
      vm.cards = cards.data;
      vm.generateRandomDeck();
    });

    MainService.getArenas().then(function(arenas){
      vm.arenas = arenas.data;
    });

    vm.cardInType = function(card) {
      return vm.selectedRarities.indexOf(card.rarity) !== -1;
    }

    vm.generateRandomDeck = function(){
      var cards = vm.cards.filter(vm.cardInType);
      vm.randomDeck = MainService.shuffle(cards).slice(0, 8);
    }

    vm.toggle = function (item, list) {
      var idx = list.indexOf(item);
      if (idx > -1) {
        list.splice(idx, 1);
      } else {
        list.push(item);
      }
      console.log(list);
    };
    vm.exists = function (item, list) {
      return list.indexOf(item) > -1;
    };
    vm.isIndeterminate = function() {
      return (vm.selectedRarities.length !== 0 &&
          vm.selectedRarities.length !== vm.cardsRarity.length);
    };
    vm.isChecked = function() {
      return vm.selectedRarities.length === vm.cardsRarity.length;
    };

  }

})();
