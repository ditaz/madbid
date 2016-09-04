/**
 * Created by Ditas on 9/1/16.
 */
define([
    'require'
],function(require) {
    var angular = require('angular');
    angular.module('madbid').factory('ProductService', ProductService);
    ProductService.$inject = ['$resource'];
    return ProductService;

    function ProductService($resource) {
        var endpoint = 'https://madbid.herokuapp.com/products/:id',
            resource = $resource(
                endpoint,
                {
                    id: '@id'
                }
            );
        return {
            save: function (params, data, success, error) {
                resource.save(
                    params
                    , data
                    , function (response) {
                        if (success !== undefined && success instanceof Function)
                            success.call(undefined, response);
                    }
                    , function (response) {
                        if (error !== undefined && error instanceof Function)
                            error.call(undefined, response);
                    });
            },
            get: function (params, success, error) {
                resource.get(
                    params
                    , function (response) {
                        if (success !== undefined && success instanceof Function)
                            success.call(undefined, response);
                    }
                    , function (response) {
                        if (error !== undefined && error instanceof Function)
                            error.call(undefined, response);
                    });
            },
            getList: function (success, error) {
                resource.query(
                    function (response) {
                        if (success !== undefined && success instanceof Function)
                            success.call(undefined, response);
                    }
                    , function (response) {
                        if (error !== undefined && error instanceof Function)
                            error.call(undefined, response);
                    });
            },
            reset: function (success, error) {
                resource.delete(
                    function (response) {
                        if (success !== undefined && success instanceof Function)
                            success.call(undefined, response);
                    }
                    , function (response) {
                        if (error !== undefined && error instanceof Function)
                            error.call(undefined, response);
                    });
            }
        };
    }
});