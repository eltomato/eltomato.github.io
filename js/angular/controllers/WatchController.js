
angular.module('croccodilli.controllers')
.controller('WatchController', ['$scope', function($scope) {

	$scope.expanded = false;

	$scope.toggleTime = function() {
		$scope.expanded = !$scope.expanded;
	};

}]);
