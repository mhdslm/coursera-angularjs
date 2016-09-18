(function(){
	'use strict';

	angular.module('LunchCheck', [])
	.controller('LunchCheckController', LunchCheckController);
	LunchCheckController.$inject = ['$scope'];
	function LunchCheckController($scope){
		$scope.userInput = '';
		$scope.message = null;
		$scope.displayMessage = function(){
			var listOfItems = $scope.userInput.split(',');
			for(var i=0; i < listOfItems.length; i++){
				if(/^\s*$/.test(listOfItems[i])){
					listOfItems.splice(i,1);
				}
			}
			if(listOfItems == ""){
				$scope.message = "Please enter data first";
			}else if(listOfItems.length <= 3){
				$scope.message = "Enjoy!";
			}else {
				$scope.message = "Too much!"
			}
		}

		$scope.isEnjoyOrTooMuch = function(){

			if($scope.message === "Enjoy!" || 
			   $scope.message === "Too much!"){
				return true;
			}
			return false;
		}

		$scope.isEmpty = function(){
			if($scope.message === "Please enter data first"){
				return true;
			}
			return false;
		}
	}
})();