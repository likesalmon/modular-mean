'use strict';

var helper = require('../../helpers/test.helper.js');

module.exports = function () {
    var get = function () {
        browser.get(helper.rootUrl + '/dashboard');
    };

    return {
        get: get
    };
};
