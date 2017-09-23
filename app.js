(function(){

  'use strict'; //browser does complain about bad coding mistakes

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService){
    var buyList = this;

    buyList.name = "";
    buyList.quantity = 1;
    buyList.addToList = function(){
      ShoppingListCheckOffService.addBuyItem(buyList.name, buyList.quantity);
    };

    buyList.items = ShoppingListCheckOffService.getBuyItems();

  }





  function ShoppingListCheckOffService(){
    var service = this;
    var buyItems = [{name: "cookies", quantity: 10},{name: "cookies", quantity: 5}];
    var boughtItems = [];

    service.addBuyItem = function(itemName, itemQuantity){
      buyItems.push({name: itemName, quantity: itemQuantity})
    };

    service.getBuyItems = function(){
      return buyItems;
    };

    service.getBoughtItems = function(){
      return boughtItems;
    };

    service.switchItem = function(index){
      var item = buyItems[index];
      buyItems.splice(index, 1);
      boughtItems.push(item);
    };
  }

})();
