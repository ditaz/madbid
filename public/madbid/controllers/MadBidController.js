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
        ,'CommunicationChannel'
        ,'ProductService'
    ];

    return MadBidController;

    function MadBidController(
        $scope
        ,CommunicationChannel
        ,ProductService
    ) {
        const ZERO_COOL = 'Zero Cool',
            ACID_BURN = 'Acid Burn',
            THE_PLAGUE = 'The Plague',
            CRASH_OVERRIDE = 'Crash Override'

        $scope.bid = bid;
        $scope.reset = reset;
        $scope.products = [];

        var initialProducts = [
            {name: 'Product 1', price: 10, winUser: '', time: 30, category: '', bidders: [], lastBidder: ''},
            {name: 'Product 2', price: 10, winUser: '', time: 30, category: '', bidders: [], lastBidder: ''},
            {name: 'Product 3', price: 20, winUser: '', time: 30, category: '', bidders: [], lastBidder: ''},
            {name: 'Product 4', price: 40, winUser: '', time: 30, category: '', bidders: [], lastBidder: ''},
            {name: 'Product 5', price: 50, winUser: '', time: 30, category: '', bidders: [], lastBidder: ''},
            {name: 'Product 6', price: 90, winUser: '', time: 30, category: '', bidders: [], lastBidder: ''},
            {name: 'Product 7', price: 100, winUser: '', time: 30, category: '', bidders: [], lastBidder: ''},
            {name: 'Product 8', price: 70, winUser: '', time: 30, category: '', bidders: [], lastBidder: ''},
            {name: 'Product 9', price: 8, winUser: '', time: 30, category: '', bidders: [], lastBidder: ''},
            {name: 'Product 10', price: 30, winUser: '', time: 30, category: '', bidders: [], lastBidder: ''},
            {name: 'Product 11', price: 20, winUser: '', time: 30, category: '', bidders: [], lastBidder: ''},
            {name: 'Product 12', price: 6, winUser: '', time: 30, category: '', bidders: [], lastBidder: ''}
        ];
        
        ProductService.getList(
            function(products) {
                if(_.isEmpty(products)) {
                    $scope.products = initialProducts;
                    initUsers();
                    return;
                }
                if(initialProducts.length !== products.length) {
                    var reduced = _.map(initialProducts, function(value) {
                            var newVal = _.filter(products, { name: value.name} )[0];
                            if(!_.isEmpty(newVal)) {
                                if(!newVal.hasOwnProperty('time')) newVal['time'] = 30;
                                if(!value.hasOwnProperty('bidders')) value['bidders'] = [];
                                return newVal;
                            }
                            return value;
                        });
                    $scope.products = reduced;
                    initUsers();
                    return;
                }
                _.forEach(products, function (val) {
                    if(!val.hasOwnProperty('time')) val['time'] = 30;
                    if(!val.hasOwnProperty('bidders')) val['bidders'] = [];
                    val.price = parseFloat(val.price.toFixed(2));
                });
                $scope.products = products;
                initUsers();
            },
            function(response) {
                $scope.products = initialProducts;
                initUsers();
            });

        CommunicationChannel.onbid($scope, function (event, product) {
            var index = _.findIndex($scope.products, { name: product.name });
            if(index === -1) {
                alert('Product not found');
                return;
            }
            $scope.products[index] = product;
            initUsers();
        });

        CommunicationChannel.onAuctionEnd($scope, function (event, product) {
            if(!_.isEmpty(product.winUser)) return;
            var possibleWinners = _.filter($scope.userNames, isEligible),
                bidsTally = [];
            if(!_.isEmpty(_.find(possibleWinners, { name: ZERO_COOL }))) {
                bidsTally.push({ name: ZERO_COOL, bids: _.filter(product.bidders, function(val) {
                    if(val === ZERO_COOL) return val;
                }).length});
            }
            if(!_.isEmpty(_.find(possibleWinners, { name: CRASH_OVERRIDE }))) {
                bidsTally.push({ name: CRASH_OVERRIDE, bids: _.filter(product.bidders, function(val) {
                    if(val === CRASH_OVERRIDE) return val;
                }).length});
            }
            if(!_.isEmpty(_.find(possibleWinners, { name: ACID_BURN }))) {
                bidsTally.push({ name: ACID_BURN, bids: _.filter(product.bidders, function(val) {
                    if(val === ACID_BURN) return val;
                }).length});
            }
            if(!_.isEmpty(_.find(possibleWinners, { name: THE_PLAGUE }))) {
                bidsTally.push({ name: THE_PLAGUE, bids: _.filter(product.bidders, function(val) {
                    if(val === THE_PLAGUE) return val;
                }).length});
            }
            var highestBidder = _.sortBy(bidsTally, ['bids'])[bidsTally.length - 1];
            product.winUser = _.isEmpty(possibleWinners) || _.isEmpty(bidsTally) ? 'No Winner'
                : (highestBidder.bids > 0 ? highestBidder.name : 'No Winner');
            bid(product);
        });

        function bid(product) {
            if(_.isEmpty(product)) {
                alert('Invalid bid');
                return;
            }
            if(product.time > 0) {
                product.bidders.push(product.lastBidder);
            }
            if(product.hasOwnProperty('$$hashKey'))
                delete product['$$hashKey'];

            var params = {
                id: _.isUndefined(product['_id']) ? '' : product['_id']
            };

            ProductService.save(
                params,
                product,
                function(response) {
                    CommunicationChannel.bid(response);
                },
                function(response) {
                    alert('Your bid has failed');
                }
            );
        }

        function getBids(userName) {
            var products =_.filter($scope.products, function(val) {
                if (val.bidders.indexOf(userName) > -1) return val;
            });
            if(_.isEmpty(products)) return 0;
            var bids = 0;
            _.forEach(products, function(val1) {
                _.forEach(val1.bidders, function(val2) {
                    if(val2 === userName) bids++;
                });
            });
            return bids;
        }

        function getLiveAuctions(userName) {
            var liveAuctions = _.filter($scope.products, function(val) {
                if(val.bidders.indexOf(userName) > -1 && val.time > 0)
                    return val;
            });
            return _.isEmpty(liveAuctions) ? 0 : liveAuctions.length;
        }

        function initUsers() {
            $scope.userNames = [
                {name: ZERO_COOL, bids: getBids(ZERO_COOL), auctions: getLiveAuctions(ZERO_COOL)},
                {name: CRASH_OVERRIDE, bids: getBids(CRASH_OVERRIDE), auctions: getLiveAuctions(CRASH_OVERRIDE)},
                {name: ACID_BURN, bids: getBids(ACID_BURN), auctions: getLiveAuctions(ACID_BURN)},
                {name: THE_PLAGUE, bids: getBids(THE_PLAGUE), auctions: getLiveAuctions(THE_PLAGUE)}
            ];
        }

        function isEligible(user) {
            return user.bids <= 15 && user.auctions <= 2;
        }

        function reset() {
            ProductService.reset(
                function(response) {
                    window.location.reload();
                },
                function(response) {

                });
        }
    }
});
