/**
 * Created by Ditas on 9/1/16.
 */
define([
    'require'
],function(require) {
    var angular = require('angular');
    angular.module('madbid').factory('BidService', BidService);
    BidService.$inject = ['$resource'];
    return BidService;

    function BidService($resource) {
        var endpoint = 'http://localhost:5000',
            resource = $resource(
                endpoint);
        return {
            bid: function(data, success, error) {
                resource.save(data
                    , function(response) {
                        if(success !== undefined && success instanceof Function)
                            success.call(undefined, response);
                    }
                    , function(response) {
                        if(error !== undefined && error instanceof Function)
                            error.call(undefined, response);
                    }
                )
            }
        };
    }
});