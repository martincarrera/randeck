(function () {

  angular
    .module('randeck')
    .controller('MainController', MainController);

  MainController.$inject = ['MainService', '$scope', '$mdSidenav'];

  function MainController(MainService, $scope, $mdSidenav) {
    // --- view-model ---
    var vm = this;
    // --- initialize variables ---
    vm.cardsRarity = ['Common', 'Rare', 'Epic', 'Legendary'];
    vm.selectedRarities = ['Common', 'Rare', 'Epic', 'Legendary'];
    vm.cardsType = ['Building', 'Spell', 'Troop'];
    vm.buildings = 1;
    vm.spells = 2;
    vm.troops = 5;
    vm.averageCost = 0;
    vm.selectedArena = 10;
    vm.randomDeck = [];
    vm.arenas = [];
    vm.cards = [];
    vm.randomCardTypes = true;

    // --- exposed funcions ---
    vm.generateRandomDeck = generateRandomDeck;
    vm.toggle = toggle;
    vm.exists = exists;
    vm.toggleMenu = toggleMenu;

    activate();
    ///////////////////////////////////////////////////////

    /**
     * Initialize the controller
     *
     * Initial API calls, setup functions, etc.
     */
    function activate() {
      MainService.getCards().then(function(cards){
        vm.cards = cards.data;
        vm.generateRandomDeck();
      });

      MainService.getArenas().then(function(arenas){
        vm.arenas = arenas.data;
      });
    }

    /**
     * Generates a random deck
     */
    function generateRandomDeck(){
      var cards = vm.cards.filter(cardInRarity);
      cards = cards.filter(cardInArena);
      if (!vm.randomCardTypes) {
        vm.randomDeck = getRandomDeckByCardType(cards);
      } else {
        vm.randomDeck = MainService.shuffle(cards).slice(0, 8);
      }
      var totalCost = vm.randomDeck
        .map(function(card){ return card.elixirCost; })
        .reduce(function(a, b){ return a + b; });
      vm.averageCost = Math.round(totalCost / (vm.randomDeck.length) * 10) / 10;
      $mdSidenav('menu').close();
    }

    function getRandomDeckByCardType(cards) {
      var buildings = cards.filter(function(card) { return card.type == 'Building'; });
      buildings = MainService.shuffle(buildings).slice(0, vm.buildings);
      var troops = cards.filter(function(card) { return card.type == 'Troop'; });
      troops = MainService.shuffle(troops).slice(0, vm.troops);
      var spells = cards.filter(function(card) { return card.type == 'Spell'; });
      spells = MainService.shuffle(spells).slice(0, vm.spells);
      var randomDeck = buildings.concat(troops).concat(spells);
      return MainService.shuffle(randomDeck).slice(0, 8);
    }

    $scope.$watch('vm.troops', function(newVal, oldVal) {
      var diff = newVal - oldVal;
      if(vm.troops + vm.spells + vm.buildings !== 8) {
        while (diff > 0) {
          vm.buildings >= vm.spells ? vm.buildings = vm.buildings - 1 : vm.spells = vm.spells - 1;
          diff--;
        }
        while (diff < 0) {
          vm.buildings <= vm.spells ? vm.buildings = vm.buildings + 1 : vm.spells = vm.spells + 1;
          diff++;
        }
      }
    });

    $scope.$watch('vm.buildings', function(newVal, oldVal) {
      var diff = newVal - oldVal;
      if(vm.troops + vm.spells + vm.buildings !== 8) {
        while (diff > 0) {
          vm.troops >= vm.spells ? vm.troops = vm.troops - 1 : vm.spells = vm.spells - 1;
          diff--;
        }
        while (diff < 0) {
          vm.troops <= vm.spells ? vm.troops = vm.troops + 1 : vm.spells = vm.spells + 1;
          diff++;
        }
      }
    });

    $scope.$watch('vm.spells', function(newVal, oldVal) {
      var diff = newVal - oldVal;
      if(vm.troops + vm.spells + vm.buildings !== 8) {
        while (diff > 0) {
          vm.buildings >= vm.troops ? vm.buildings = vm.buildings - 1 : vm.troops = vm.troops - 1;
          diff--;
        }
        while (diff < 0) {
          vm.buildings <= vm.troops ? vm.buildings = vm.buildings + 1 : vm.troops = vm.troops + 1;
          diff++;
        }
      }
    });

    /**
     * Toggles menu
     */
    function toggleMenu() {
      $mdSidenav('menu').toggle();
    }

    /**
     * Toggles item in a list
     *
     * @param {Any}  item to toggle
     * @param {Array<Any>}  list
     */
    function toggle(item, list) {
      var idx = list.indexOf(item);
      if (idx > -1) {
        list.splice(idx, 1);
      } else {
        list.push(item);
      }
    };

    /**
     * Checks item existence in a list
     *
     * @param {Any}  item to check
     * @param {Array<Any>}  list to check
     * @returns {Bool}  item exists in list
     */
    function exists(item, list) {
      return list.indexOf(item) > -1;
    };

    /**
     * Checks if a card is in the selected arenas
     *
     * @param {Object}  card
     * @returns {Bool}  card belongs to the selected arenas
     */
    function cardInArena(card) {
      return card.arena <= vm.selectedArena;
    }

    /**
     * Checks if a card is in the selected rarities
     *
     * @param {Object}  card
     * @returns {Bool}  card rarity is in selected rarities
     */
    function cardInRarity(card) {
      return vm.selectedRarities.indexOf(card.rarity) !== -1;
    }
  }
})();
