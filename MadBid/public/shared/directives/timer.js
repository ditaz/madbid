/**
 * Created by Ditas on 9/2/16.
 */
define([
    'require'
],function (require) {
    'use strict';
    var angular = require('angular');
    angular.module('madbid').directive('timer', Timer);

    Timer.$inject = ['$timeout', '$interval'];

    return Timer;

    function Timer($timeout, $interval) {
        return {
            restrict: 'E',
            scope: {
                interval: '=interval',
                startTime: '=startTime',
                countDown: '=countDown'
            },
            templateUrl: '/shared/views/timer.html',
            link: function (scope, elem, attr) {
                //elem.on('$destroy', function() {
                  //  clearInterval();
                //});

                var timeoutId = $interval(function(){
                    if(scope.countDown<=0){
                        scope.$root.$broadcast('end', 'Auction end!');
                        clearInterval();
                    }else{
                        scope.countDown--;
                    }
                }, 1000);

                function clearInterval() {
                    $interval.cancel(timeoutId);
                }
            }



        }



        }

})
