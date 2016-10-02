(function(){
	'use strict';
	/* Define AngularJS Module*/
	angular.module('NarrowItDownApp', [])
	/* Register NarrowItDownController controller*/
	.controller('NarrowItDownController', NarrowItDownController)
	/* Register MenuSearchService service*/
	.factory('MenuSearchService', MenuSearchService)
	/* Register foundItems directive*/
	.directive('foundItems', FoundItems);
	/* Inject dependencies to NarrowItDownController*/
	NarrowItDownController.$inject = ['MenuSearchService'];
	/* NarrowItDownController handler function */
	function NarrowItDownController(MenuSearchService){
		var myCtrl = this;
		myCtrl.found = null;
		myCtrl.error = null;
		myCtrl.getFilteredList = function(searchTerm){
			MenuSearchService.getMatchedMenuItems(searchTerm)
			.then(function(foundItems){
				myCtrl.found = foundItems;
			}, function(error){
				//Error handling
				myCtrl.error = error;
			})
		}

		myCtrl.removeItem = function(index){
			myCtrl.found.splice(index,1);
		}
	}
	/* Inject dependencies to MenuSearchService*/
	MenuSearchService.$inject = ['$http'];
	/* MenuSearchService handler function */
	function MenuSearchService($http){
		var self = {};

		self.getMatchedMenuItems = function(searchTerm){
			var promise = $http({
				method: 'GET',
				url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
			}).then(function(response){
				var foundItems = [];
				var menu_items = response.data.menu_items;
				angular.forEach(menu_items, function(item){
					if(angular.isDefined(searchTerm) && searchTerm.length !== 0 && item.description.indexOf(searchTerm) !== -1){
						foundItems.push(item);
					}
				});
				return foundItems;
			}, function(error){
				//Error handling
				return error;
			});
			return promise;
		} 

		return self;
	}
	/* foundItems directive handler function */
	function FoundItems(){
		var ddo = {
			restrict: 'E',
			scope: {
				foundItems: '<',
				onRemove: '&'
			},
			templateUrl: 'foundItems.html'
		};
		return ddo;
	}
})();