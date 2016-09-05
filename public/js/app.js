/**
 * Created by Ditas on 9/1/16.
 */
define([
    'angular'
    ,'routesConfig'
],
function(
    angular
    ,routesConfig
) {
    'use strict';

    var app = angular.module(
        'madbid',
        [
            'ui.router'
            ,'ngResource'
            ,'angular-storage'
        ]);

    app.config([
        '$locationProvider'
        ,'$controllerProvider'
        ,'$compileProvider'
        ,'$filterProvider'
        ,'$provide'
        ,'$animateProvider'
        ,'$resourceProvider'
        ,function(
            $locationProvider
            ,$controllerProvider
            ,$compileProvider
            ,$filterProvider
            ,$provide
            ,$animateProvider
            ,$resourceProvider
        ) {
            $resourceProvider.defaults.stripTrailingSlashes = false;
            app.controller = $controllerProvider.register;
            app.service = $provide.service;
            app.factory = $provide.factory;
            app.filter = $filterProvider.register;
            app.directive = $compileProvider.directive;
            app.animation = $animateProvider.register;
            $locationProvider.html5Mode(true);
        }
    ]);

    app.config(routesConfig);

    app.run(function(
        $rootScope
        ,$state
        ,$stateParams
    ){
        $rootScope.state = $state;
        $rootScope.stateParams = $stateParams;
    });

    return app;
});
