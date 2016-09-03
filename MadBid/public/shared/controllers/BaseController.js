/**
 * Created by Ditas on 9/1/16.
 */
define([
    'require'
],function(require){
    'use strict';

    var angular = require('angular');
    angular.module('madbid').controller('BaseController', BaseController);

    BaseController.$inject = [
        '$scope'
        ,'$state'
        ,'$stateParams'
    ];

    return BaseController;

    function BaseController(
        $scope
        ,$state
        ,$stateParams
    ) {

    }
});
