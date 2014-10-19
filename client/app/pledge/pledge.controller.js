'use strict';

angular.module('nonziApp')
  .controller('PledgeCtrl', ['$scope', '$location', '$anchorScroll', 'Donation', '$stateParams', 'localStorageService', function ($scope, $location, $anchorScroll, Donation, $stateParams, localStorageService) {
	var today = new Date();
	today.setDate(today.getDate() + 3);
	$scope.expiration = today;

    $scope.confirmPledge = function() {
    	if($scope.pledgeAmount != null && $scope.name != null) {
	    	var pledge = {
	    		"downlineAmount":$scope.pledgeAmount,
	    		"amount":$scope.pledgeAmount,
	    		"user":$scope.name,
	    		"createdAt": new Date(),
          "upline": $stateParams.referralID
	    	};

	    	Donation.save(pledge).$promise.then(function(result) {
          localStorageService.set('didDonate', true);
	    		console.log(result);
		        $anchorScroll(0);
		    	$location.path("/report/" + result._id);
	    	});
    	}
    }
}]);
