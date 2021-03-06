(function(){
	'use strict';

	angular.module('data')
	.factory('MenuDataService', MenuDataService);

	MenuDataService.$inject = ['$http'];

	function MenuDataService($http){
		var service = {}

		service.getAllCategories = function(){
			var promise = $http({
				method: 'GET',
				url: 'https://davids-restaurant.herokuapp.com/categories.json'
			});
			return promise;
		}

		service.getItemsForCategory = function(categoryShortName){
			var promise = $http({
				method: 'GET',
				url: 'https://davids-restaurant.herokuapp.com/menu_items.json',
				params: {
					category: categoryShortName
				}
			});
			return promise;
		}

		return service;
	}
})();