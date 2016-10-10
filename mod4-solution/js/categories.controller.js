(function(){
	'use strict';

	angular.module('MenuApp')
	.controller('CategoriesListCtrl', CategoriesListCtrl);

	CategoriesListCtrl.$inject = ['categories'];

	function CategoriesListCtrl(categories){
		var catListCtrl = this;

		catListCtrl.categories = categories;
	}
})();