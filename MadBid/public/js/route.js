/**
 * Created by Ditas on 9/1/16.
 */
define([],
function() {
    routesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    return routesConfig;

    function routesConfig($stateProvider, $urlRouterProvider) {
        var baseUrl = '/';
        function getViewPath(view, component) {
            return baseUrl + component + '/views/' + view;
        }

        $urlRouterProvider.otherwise(function($injector) {
            var $state = $injector.get('$state');
            $state.go('/');
        });

        var base = {
                abstract: true,
                url: '',
                data: {
                    requireLogin: false
                },
                template: '<div ui-view></div>',
                controller: 'BaseController',
                controllerAs: 'BaseController'
            },
            index = {
                url: '/',
                data: {
                    requireLogin: false
                },
                templateUrl: getViewPath('index.html', 'madbid')/*,
				controller: 'MadBidController',
				controllerAs: 'MadBidController'*/
            };

        $stateProvider.state('base', base)
            .state('base.index', index);
    }
});