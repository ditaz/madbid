/**
 * Created by Ditas on 9/1/16.
 */
define([
   'require'
],
function(require) {
    var angular = require('angular');
    angular.module('madbid').factory('StorageService', StorageService);
    StorageService.$inject = ['store'];
    return StorageService;

    function StorageService(store) {
        return store.getNamespacedStore('madbid');
    }
});