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
		toBuy.buyItem = function(index){
			ShoppingListCheckOffService.buyItem(index);
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
			{ name: "eggs", quantity: 10 },
			{ name: "chocolates", quantity: 2 }
		];
		var boughtItems = [];

		service.getToBuyItems = function(){
			return toBuyItems;
		}

		service.getBoughtItems = function(){
			return boughtItems;
		}

		service.buyItem = function(itemIndex){
			var item = toBuyItems.splice(itemIndex, 1);
			boughtItems.push(item[0]);
			
		}
	}

})();