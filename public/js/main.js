/**
 * Created by Ditas on 8/31/16.
 */
require.config({
    waitSeconds: 0,
    baseUrl: '/',
    paths: {
        'jquery': 'node_modules/jquery/dist/jquery.min',
        'angular': 'node_modules/angular/angular.min',
        'bootstrap': 'node_modules/bootstrap/dist/js/bootstrap.min',
        'angular-ui-router': 'node_modules/angular-ui-router/release/angular-ui-router.min',
        'ui-bootstrap': 'node_modules/angular-bootstrap/ui-bootstrap.min',
        'angular-resource': 'node_modules/angular-resource/angular-resource.min',
        'lodash': 'node_modules/lodash/lodash.min',
        'routesConfig': 'js/route',
		'app': 'js/app',
        'BaseController': 'shared/controllers/BaseController',
        'MadBidController': 'madbid/controllers/MadBidController',
        'CommunicationChannel': 'shared/services/CommunicationChannel',
        'BidService': 'madbid/services/BidService',
        'Timer': 'shared/directives/timer'
    },
    shim: {
        'jquery': {
            exports: 'jQuery'
        },
        'angular': {
			exports: 'angular',
            deps: ['jquery']
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'angular-ui-router': {
            deps: ['angular']
        },
        'ui-bootstrap': {
            deps: ['jquery', 'angular', 'bootstrap']
        },
        'angular-resource': {
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
        'BidService': {
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