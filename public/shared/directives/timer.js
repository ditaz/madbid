/**
 * Created by Ditas on 9/2/16.
 */
define([
    'require'
],function (require) {
    'use strict';
    var angular = require('angular');
    angular.module('madbid').directive('timer', Timer);

    Timer.$inject = ['$interval', 'CommunicationChannel'];

    return Timer;

    function Timer($interval, CommunicationChannel) {
        return {
            restrict: 'E',
            scope: {
                interval: '=',
                startTime: '=',
                countDown: '=',
                product: '='
            },
            templateUrl: '/shared/views/timer.html',
            link: function (scope, elem, attr) {
                var timeoutId = startCountdown();

                CommunicationChannel.onbid(scope, function(event, data) {
                    scope.countDown = 30;
                    clearInterval(timeoutId);
                    timeoutId = startCountdown();
                });

                function startCountdown() {
                    var id = $interval(function(){
                        if(scope.countDown<=0){
                            scope.$root.$broadcast('end', '');
                            clearInterval();
                        }else{
                            scope.countDown--;
                        }
                    }, 1000);
                    return id;
                }

                function clearInterval() {
                    $interval.cancel(timeoutId);
                }

                scope.$on('$destroy', function() {
                    clearInterval();
                });
            }
        }
    }
});
