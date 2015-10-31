'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$timeout', function($scope, $timeout) {
	$scope.fetch = function(){
		var data = [
			{
				from: 'Oren',
				body: 'Lukasz Holeczek at creativeLabs HQ',
				date: '3h 38m 15s',
				type: 'whatsapp',
				time: '3:43 PM'
			},
			{
				from: 'Main Pal',
				body: 'Lukasz Holeczek',
				date: '3h 38m 15s',
				type: 'snapchat',
				time: '3:43 PM'
			},
			{
				from: 'Oren',
				body: 'Lukasz Holeczek',
				date: '3h 38m 15s',
				type: 'envelope',
				time: '3:43 PM'
			},
			{
				from: 'Oren',
				body: 'Fixed PayPal problems',
				date: '3h 38m 15s',
				type: 'calendar',
				time: '3:43 PM'
			},
			{
				from: 'Main Pal',
				body: 'Lukasz Holeczek at creativeLabs HQ',
				date: '3h 38m 15s',
				type: 'map-marker',
				time: '3:43 PM'
			},
			{
				from: 'Oren',
				body: 'Lukasz Holeczek',
				date: '3h 38m 15s',
				type: 'phone',
				time: '3:43 PM'
			},
			{
				from: 'Main Pal',
				body: 'Lukasz Holeczek',
				date: '3h 38m 15s',
				type: 'envelope',
				time: '3:43 PM'
			},
			{
				from: 'Main Pal',
				body: 'Fixed PayPal problems',
				date: '3h 38m 15s',
				type: 'calendar',
				time: '3:43 PM'
			},
			{
				from: 'Oren',
				body: 'Lukasz Holeczek',
				date: '3h 38m 15s',
				type: 'envelope',
				time: '3:43 PM'
			}
		];
		$timeout(function () { $scope.assignmentsLoaded(data); }, 1000);
	};
	$scope.assignmentsLoaded = function(data){
		$scope.timelineData = data;
	};
	$scope.fetch();
}])

.directive('timeline', ['$window', function($window) {
  return {
    restrict: 'E',
    templateUrl: 'timeline.html',
	link: function($scope, element, attrs) {
		// Trigger when timelineData changes,
		// including by directives like ng-repeat
		var watch = $scope.$watch('timelineData', function() {
			$scope.onResize = function() {
				$(".timeline", element) && $(".timeslot", element).each(function() {
					var e = $(this).find(".task").outerHeight();
					$(this).css("height", e)
				});
			};
			angular.element($window).bind('resize', function() {
				$scope.onResize();
			});
			
			// Wait for templates to render
			$scope.$evalAsync(function() {
				// Finally, directives are evaluated
				// and templates are renderer here
				$scope.onResize();
			});
		});
	},
  };
}]);