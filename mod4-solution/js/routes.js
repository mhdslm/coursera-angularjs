(function(){
	'use strict';
	
	angular.module('MenuApp')
	.config(RoutesConfig);

	RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

	function RoutesConfig($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise('/');

		$stateProvider

		.state('home', {
			url: '/',
			templateUrl: 'templates/home.html'
		})

		.state('categories', {
			url: '/categories',
			templateUrl: 'templates/categories.html',
			controller: 'CategoriesListCtrl as catListCtrl',
			resolve: {
				categories: ['MenuDataService', function(MenuDataService){
					return MenuDataService.getAllCategories()
					.then(function(response){
						return response.data;
					});
				}]
			}
		})

		.state('items', {
			url: '/items/{shortName}',
			templateUrl: 'templates/items.html',
			controller: 'ItemsCtrl as itemsCtrl',
			resolve: {
				items: ['$stateParams', 'MenuDataService', 
					function($stateParams, MenuDataService){
						return MenuDataService.getItemsForCategory($stateParams.shortName)
						.then(function(response){
							var items = response.data.menu_items;
							var filteredItems = [];
							angular.forEach(items, function(item){
								if(item.short_name.startsWith($stateParams.shortName)){
									filteredItems.push(item);
								}
							});
							return filteredItems;
						});
					}]
			}
		});

	}
})();

