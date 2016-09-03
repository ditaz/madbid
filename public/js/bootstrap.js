/**
 * Created by Ditas on 9/1/16.
 */
define([
    'app'
    ,'angular'
    ,'angular-ui-router'
    ,'bootstrap'
    ,'ui-bootstrap'
    ,'angular-resource'
    ,'lodash'
    ,'CommunicationChannel'
    ,'BidService'
    ,'Timer'
    ,'BaseController'
    ,'MadBidController'
], function() {
    'use strict';

    angular.element(document).ready(function() {
        angular.bootstrap(document, ['madbid']);
    });
});
