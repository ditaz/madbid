/**
 * Created by Ditas on 9/1/16.
 */
define([
    'app'
    ,'angular'
    ,'angular-resource'
    ,'angular-storage'
    ,'angular-ui-router'
    ,'bootstrap'
    ,'ui-bootstrap'
    ,'lodash'
    ,'CommunicationChannel'
    ,'ProductService'
    ,'Timer'
    ,'StorageService'
    ,'BaseController'
    ,'MadBidController'
], function() {
    'use strict';

    angular.element(document).ready(function() {
        angular.bootstrap(document, ['madbid']);
    });
});
