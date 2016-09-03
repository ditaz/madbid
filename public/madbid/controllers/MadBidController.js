/**
 * Created by Ditas on 9/1/16.
 */
define([
    'require'
],function(require){
    'use strict';

    var angular = require('angular');
    angular.module('madbid').controller('MadBidController', MadBidController);

    MadBidController.$inject = [
        '$scope'
        ,'$state'
        ,'$stateParams'
        ,'CommunicationChannel'
        ,'BidService'
    ];

    return MadBidController;

    function MadBidController(
        $scope
        ,$state
        ,$stateParams
        ,CommunicationChannel
        ,BidService
    ) {
        $scope.bid = bid;
        $scope.products = [
            {name: 'Product 1', price: 10, winUser: '', time: 30},
            {name: 'Product 2', price: 10, winUser: '', time: 30},
            {name: 'Product 3', price: 20, winUser: '', time: 30},
            {name: 'Product 4', price: 40, winUser: '', time: 30},
            {name: 'Product 5', price: 50, winUser: '', time: 30},
            {name: 'Product 6', price: 90, winUser: '', time: 30},
            {name: 'Product 7', price: 100, winUser: '', time: 30},
            {name: 'Product 8', price: 70, winUser: '', time: 30},
            {name: 'Product 9', price: 8, winUser: '', time: 30},
            {name: 'Product 10', price: 30, winUser: '', time: 30},
            {name: 'Product 11', price: 20, winUser: '', time: 30},
            {name: 'Product 12', price: 6, winUser: '', time: 30}
        ];

        CommunicationChannel.onbid($scope, function (event, data) {
            alert(data);
        });

        CommunicationChannel.onAuctionEnd($scope, function (event, data) {

        });

        function bid() {
            BidService.bid(
                {test: 'test'}
                ,function(response) {
                    CommunicationChannel.bid(JSON.stringify(response));
                }
            );
        }
    }
});
