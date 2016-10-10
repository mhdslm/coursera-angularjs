(function(){
	'use strict';

	angular.module('MenuApp')
	.controller('ItemsCtrl', ItemsCtrl);

	ItemsCtrl.$inject = ['items'];

	function ItemsCtrl(items){
		var itemsCtrl = this;

		itemsCtrl.items = items;

	}
})();