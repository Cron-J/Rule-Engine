'use strict';

/* defining the app */
var app = angular
	.module("demo", ['ngRoute','ngResource', 'angular-growl','jsonFormatter'])
	.config(function($routeProvider, growlProvider) {
		growlProvider.globalTimeToLive(5000);
	    $routeProvider
				.when('/',
					 {templateUrl: 'app/rule/editor.html'},
					 {controller: 'ruleCtrl.js'}
					).
				when('/edit/:id',
					 {templateUrl: 'app/rule/editor.html'},
					 {controller: 'ruleCtrl.js'}
					)
				.otherwise({redirectTo: '/'});
	});