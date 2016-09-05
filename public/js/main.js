/**
 * Created by Ditas on 8/31/16.
 */
require.config({
    waitSeconds: 0,
    baseUrl: '/',
    paths: {
        'jquery': 'node_modules/jquery/dist/jquery.min',
        'angular': 'node_modules/angular/angular.min',
        'angular-resource': 'node_modules/angular-resource/angular-resource.min',
        'angular-storage': 'node_modules/angular-storage/dist/angular-storage.min',
        'angular-ui-router': 'node_modules/angular-ui-router/release/angular-ui-router.min',
        'lodash': 'node_modules/lodash/lodash.min',
        'routesConfig': 'js/route',
		'app': 'js/app',
        'BaseController': 'shared/controllers/BaseController',
        'MadBidController': 'madbid/controllers/MadBidController',
        'CommunicationChannel': 'shared/services/CommunicationChannel',
        'ProductService': 'madbid/services/ProductService',
        'Timer': 'shared/directives/timer',
        'StorageService': 'shared/services/StorageService'
    },
    shim: {
        'jquery': {
            exports: 'jQuery'
        },
        'angular': {
			exports: 'angular',
            deps: ['jquery']
        },
        'angular-cookies': {
            deps: ['angular']
        },
        'angular-resource': {
            deps: ['angular']
        },
        'angular-storage': {
            deps: ['angular']
        },
        'angular-ui-router': {
            deps: ['angular']
        },
        'lodash': {
            exports: '_'
        },
        'CommunicationChannel':{
            deps: ['angular']
        },
        'Timer':{
            deps: ['angular']
        },
        'StorageService':{
            deps: ['angular']
        },
        'ProductService': {
            deps: ['angular']
        },
        'BaseController': {
            deps: ['angular']
        },
        'MadBidController': {
            deps: ['angular']
        }
    },
    deps: ['js/bootstrap']
});