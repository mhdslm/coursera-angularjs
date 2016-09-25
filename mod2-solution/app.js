(function(){
	'use strict';

	angular.module('ShoppingListCheckOff', [])
	.controller('ToBuyController', ToBuyController)
	.controller('AlreadyBoughtController', AlreadyBoughtController)
	.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

	ToBuyController.$inject = ['ShoppingListCheckOffService'];
	AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

	function ToBuyController(ShoppingListCheckOffService){
		var toBuy = this;
		toBuy.items = ShoppingListCheckOffService.getToBuyItems();
		toBuy.buyItem = function(item, index){
			ShoppingListCheckOffService.buyItem(item, index);
		}
	}

	function AlreadyBoughtController(ShoppingListCheckOffService){
		var alreadyBought = this;
		alreadyBought.items = ShoppingListCheckOffService.getBoughtItems();
	}

	function ShoppingListCheckOffService(){
		var service = this;
		var toBuyItems = [
			{ name: "cookies", quantity: 10 },
			{ name: "ice cream bars", quantity: 5 },
			{ name: "bottles of water", quantity: 2 },
			{ name: "eggs", quantity: 10 }
		];
		var boughtItems = [];

		service.getToBuyItems = function(){
			return toBuyItems;
		}

		service.getBoughtItems = function(){
			return boughtItems;
		}

		service.buyItem = function(item, itemIndex){
			boughtItems.push(item);
			toBuyItems.splice(itemIndex, 1);
		}
	}

})();