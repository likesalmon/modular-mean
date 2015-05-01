'use strict';

module.exports = ['$scope', '$mdSidenav', '$mdMedia', 'NavigationService', function ($scope, $mdSidenav, $mdMedia, NavigationService) {
    $scope.nav = {
        items: NavigationService.get()
    };

    $scope.toggleRightSidenav = function () {
        $mdSidenav('right').toggle();
    };

    $scope.$watch(function () {
        return $mdMedia('gt-sm');
    }, function(isGtSm) {
        if (isGtSm) {
            $mdSidenav('right').close();
        }
    });
}];
