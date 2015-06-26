'use strict';

/* defining the app */
var app = angular
	.module("demo", ['ngRoute','ngResource', 'angular-growl'])
	.config(function($routeProvider, growlProvider) {
		growlProvider.globalTimeToLive(5000);
	    $routeProvider
				.when('/',
					 {templateUrl: 'app/rule/rule.html'},
					 {controller: 'ruleCtrl.js'}
					).
				when('/edit/:id',
					 {templateUrl: 'app/rule/rule.html'},
					 {controller: 'ruleCtrl.js'}
					)
				.otherwise({redirectTo: '/'});
	});