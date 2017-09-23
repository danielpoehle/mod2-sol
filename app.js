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

    buyList.switchItem = function(itemIndex){
      ShoppingListCheckOffService.switchItem(itemIndex);
    };

    buyList.empty = function(){
      return buyList.items.length === 0;
    };

  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService){
    var boughtList = this;
    boughtList.items = ShoppingListCheckOffService.getBoughtItems();

    boughtList.empty = function(){
      return boughtList.items.length === 0;
    };
  }



  function ShoppingListCheckOffService(){
    var service = this;
    var buyItems = [{name: "cookies chocolate", quantity: 10},{name: "cookies vanilla", quantity: 5},
  {name: "sausages", quantity: 3}, {name: "eggs", quantity: 10}, {name: "bottles of water", quantity: 6}];
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
      //console.log(item);
      //console.log(boughtItems);
      buyItems.splice(index, 1);
      boughtItems.push(item);
    };
  }

})();
