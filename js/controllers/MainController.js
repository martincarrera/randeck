(function () {

  angular
    .module('randeck')
    .controller('MainController', MainController);

  MainController.$inject = ['MainService'];

  function MainController(MainService) {
    // --- view-model ---
    var vm = this;
    // --- initialize variables ---
    vm.cardsRarity = ['Common', 'Rare', 'Epic', 'Legendary'];
    vm.selectedRarities = ['Common', 'Rare', 'Epic', 'Legendary'];
    vm.averageCost = 0;
    vm.selectedArena = 8;
    vm.randomDeck = [];
    vm.arenas = [];
    vm.cards = [];
    
    // --- exposed funcions ---
    vm.generateRandomDeck = generateRandomDeck;
    vm.toggle = toggle;
    vm.exists = exists;
    
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
      vm.randomDeck = MainService.shuffle(cards).slice(0, 8);
      var totalCost = vm.randomDeck
        .map(function(card){ return card.elixirCost; })
        .reduce(function(a, b){ return a + b; });
      vm.averageCost = Math.round(totalCost / (8) * 10) / 10;
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
