'use strict';

/**
 * @ngdoc overview
 * @name tech3App
 * @description
 * # tech3App
 *
 * Main module for EVE Gate.
 */
angular
  .module('tech3App', [
    'ngAnimate',
    'ngRoute',
    'ngStorage',
    'ngSanitize'
  ])
  .constant('BACKEND', {
    url: 'http://192.168.0.102:3000/api/',
    message: 'Tech 3 is still in active development and may change drastically during this time. Expect some bugs as we work through this.'
  })
  .config(function ($routeProvider, $locationProvider, $localStorageProvider) {
    $locationProvider.html5Mode(true);
    $localStorageProvider.setKeyPrefix('T3');
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/error/:code', {
        templateUrl: 'views/error.html',
        controller: 'ErrorCtrl',
        controllerAs: 'error'
      })
      .when('/info/item/:item?', {
        templateUrl: 'views/item.html',
        controller: 'ItemCtrl',
        controllerAs: 'item'
      })
      .when('/info/search', {
        templateUrl: 'views/database-search.html',
        controller: 'DatabaseSearchCtrl',
        controllerAs: 'databaseSearch'
      })
      .otherwise({
        redirectTo: '/error/404'
      });
  })
  .run(function ($rootScope, $compile, $user, $location, BACKEND) {
    $rootScope.$user = $user;
    $rootScope.$meta = {
      backendMsg: BACKEND.message,
      path: function () {
        var path = $location.path();
        return path.indexOf('/', 1) > 0 ? path.substring(0, path.indexOf('/', 1)) : path;
      },
      pause: function (ms) {
        var until = new Date().getTime() + ms;
        while (new Date().getTime() < until) { /* no-op */ }
      },
      id: function (val, is) {
        return typeof val === is;
      },
      nav: [
        [
          {
            text: 'Information',
            href: 'info',
            fa: 'database',
            items: [
              { text: 'Database Search', href: 'search' },
            ]
          },
          {
            text: 'Industry',
            href: 'indy',
            fa: 'cogs',
            items: [
              { text: 'Market Appraisals', href: 'appraisal', beta: true },
              { },
              { text: 'Reactions', href: 'reactions' },
              { text: 'Mining Profits', href: 'mining' }
            ]
          },
          {
            text: 'Logistics',
            href: 'logi',
            fa: 'map',
            items: [
              { text: 'Ship Fitting', href: 'fits', beta: true },
              { },
              { text: 'New Eden Starmap', href: 'starmap' },
              { text: 'Wormhole Mapping', href: 'wormholes', beta: true }
            ]
          },
          {
            text: 'About',
            href: 'about',
            fa: 'question-circle',
            items: [
              { text: 'Support Tech3', href: 'support' },
              { text: 'Contribute', href: '@https://github.com/VevoxDigital/tech-3' },
              { text: 'Extended Trial', href: '@http://eveonline.com' },
              { text: 'Tech 3 API', href: 'api' },
              { },
              { text: 'Contact Us', href: 'contact' }
            ]
          }
        ],
        [

        ]
      ]
    };
  });
