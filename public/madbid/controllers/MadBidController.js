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
        $scope.products = [];
            
        var initialProducts = [
            {name: 'Product 1', price: 10, winUser: '', time: 30, category: ''},
            {name: 'Product 2', price: 10, winUser: '', time: 30, category: ''},
            {name: 'Product 3', price: 20, winUser: '', time: 30, category: ''},
            {name: 'Product 4', price: 40, winUser: '', time: 30, category: ''},
            {name: 'Product 5', price: 50, winUser: '', time: 30, category: ''},
            {name: 'Product 6', price: 90, winUser: '', time: 30, category: ''},
            {name: 'Product 7', price: 100, winUser: '', time: 30, category: ''},
            {name: 'Product 8', price: 70, winUser: '', time: 30, category: ''},
            {name: 'Product 9', price: 8, winUser: '', time: 30, category: ''},
            {name: 'Product 10', price: 30, winUser: '', time: 30, category: ''},
            {name: 'Product 11', price: 20, winUser: '', time: 30, category: ''},
            {name: 'Product 12', price: 6, winUser: '', time: 30, category: ''}
        ];
        
        BidService.getList(
            function(products) {
                if(_.isEmpty(products)) {
                    alert('Failed to get products');
                }
                $scope.products = products || initialProducts;
            },
            function(response) {
                $scope.products = initialProducts;
            });
        
        CommunicationChannel.onbid($scope, function (event, data) {
            var index = _.indexOf($scope.products, { name: data.name });
            if(index === -1) {
                alert('Product not found');
                return;
            }
            $scope.products[index] = data;
        });

        CommunicationChannel.onAuctionEnd($scope, function (event, data) {

        });

        function bid(product) {
            if(_.isEmpty(product)) {
                alert('Invalid bid');
                return;
            }
            var params = {
                id: _.isUndefined(product._id) ? '' : product_.id
            };
            BidService.save(
                params,
                product,
                function(response) {
                    CommunicationChannel.bid(response);
                },
                function(response) {
                    alert(response.error);
                }
            );
        }
    }
});
