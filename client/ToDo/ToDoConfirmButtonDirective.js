'use strict';

module.exports = function () {
    return {
        restrict: 'E',
        scope: {},
        template: '<button>Remove</button>',
        link: function (scope, element, attrs) {
            element.on('click', function () {
                element.children().text('You sure?');
            });
        }
    };
};
