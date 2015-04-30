'use strict';

module.exports = function () {
    var navItems = [
        {
            title: 'Dashboard',
            state: 'dashboard'
        },
        {
            title: 'ToDo',
            state: 'todo'
        }
    ];

    var get = function () {
        return navItems;
    };

    return {
        get: get
    };
};
