'use strict';

module.exports = ['$scope', '$mdSidenav', 'NavigationService', function ($scope, $mdSidenav, NavigationService) {
    $scope.nav = {
        items: NavigationService.get()
    };

    $scope.toggleRightSidenav = function () {
        $mdSidenav('right').toggle();
    };
}];
