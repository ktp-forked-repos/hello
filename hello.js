/*global $, app, ko, Raphael, require, angular, setInterval, clearInterval, jQuery, define, KeyEvent, setTimeout, clearTimeout, AccessifyHTML5, log */
function hello() {
    console.log('hello world');
}

define([
    'lodash',
    'angular',
    'app'
], function (_, angular, app) {

    'use strict';

    app.controller('JobController', ['AlertsManager', '$location', '$http', '$state', '$scope','$rootScope', '$modal', 'Ƹuser', 'Ƹjobs', '$q',
        function (AlertsManager, $location, $http, $state, $scope, $rootScope, $modal, Ƹuser, Ƹjobs, $q) {
        var that = this;

        $scope.isCollapsed = false;
       $scope.loadingCurrentJob = true;

        $scope.init = function(job) {
            console.log('hello world=', hello);
        };

        var bye = function() {
          console.log('bye world');
        };

        $scope.getCollapsedLabel = function() {
            if ($scope.isCollapsed) {
                return 'Show Job Details';
            }
            return 'Hide Job Details';
        };

    }]);

});