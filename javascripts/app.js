'use strict';

var app = angular.module('ngApp', []) // , ['ngRoute', 'ngSanitize'])
  // .config(['$routeProvider', function($routeProvider) {
  //   // $routeProvider.when('/account', {templateUrl: 'partials/account.html', controller: 'AccountController'});
  //   // $routeProvider.otherwise({redirectTo: '/'});
  // }]);


app.controller('DummyController', ['$scope', function DummyController($scope) {

}])

app.controller('DemoController', ['$rootScope','$scope', function DemoController($rootScope, $scope) {
	$scope.replay = function() {
		$rootScope.$broadcast('replay')
	}
}])

app.directive('featuresVideo', ['$rootScope', '$timeout', function featuresVideo($rootScope, $timeout) {
	return function(scope, elem, attr) {
		function play(delay) {
			$timeout(function() {
				elem[0].play()
			}, delay)
		}

		elem[0].addEventListener("ended", function() {
			// elem.addClass('hide')
			$rootScope.$broadcast('video-ended-features')
		})

		$rootScope.$on('replay', function() {
			elem.removeClass('hide')
			play(1)
		})

		play(3000)
	}
}])

app.directive('shareVideo', ['$rootScope', '$timeout', function shareVideo($rootScope, $timeout) {
	return function(scope, elem, attr) {
		function play(delay) {
			elem[0].play()
		}

		elem[0].addEventListener("ended", function() {
			$rootScope.$broadcast('video-ended-share')
		})


		$rootScope.$on('video-ended-features', function() {
			elem.removeClass('hide')
			play(0)
		})
	}
}])

app.directive('showOn', ['$rootScope', '$timeout', function showOn($rootScope, $timeout) {
	return function(scope, elem, attr) {
		$rootScope.$on(attr.showOn, function() {
			elem.removeClass('hide')
		})
	}
}])

app.directive('hideOn', ['$rootScope', function hideOn($rootScope) {
	return function(scope, elem, attr) {
		$rootScope.$on(attr.hideOn, function() {
			elem.addClass('hide')
		})
	}
}])


