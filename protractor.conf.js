'use strict';

exports.config = {

    allScriptsTimeout: 11000,

    baseUrl: 'http://localhost:3000/',

    rootElement: 'body',

    capabilities: {
        browserName: 'chrome',
        version: '',
        platform: 'ANY'
    },

    framework: 'mocha',

    jasmineNodeOpts: {
        isVerbose: false,
        showColors: true,
        includeStackTrace: true,
        defaultTimeoutInterval: 30000
    },

    specs: [
        'client/**/test/*.e2e.js'
    ]

};
