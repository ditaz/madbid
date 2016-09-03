/**
 * Created by Ditas on 9/1/16.
 */

define(
['require'],
function(require){
    var angular = require('angular');
    angular.module('madbid').service('CommunicationChannel', CommunicationChannel);
    CommunicationChannel.$inject = ['$rootScope'];
    return CommunicationChannel;

    function CommunicationChannel($rootScope) {
        return {
            bid: function(data) {
                $rootScope.$broadcast('bid', data);
            },
            onbid: function (scope, cb) {
                scope.$on('bid', function(event, data){
                    cb(event, data);
                });
            },
            endAuction: function (data) {
                $rootScope.$broadcast('end', data);
            },
            onAuctionEnd: function (scope, cb) {
                scope.$on('end', function(event, data){
                    cb(event, data);
                });
            }
        };
    }
});
