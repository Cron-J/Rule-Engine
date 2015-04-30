app.controller('ruleCtrl', [ '$scope', '$http','$location', 'growl', 'rule',
	function($scope, $http, $location,  growl, rule) {
		$scope.changeView.ruleEditPage = true;
		$scope.changeView.expressionEditPage = false;
		$scope.changeView.actionEditPage = false;

		$scope.add_new_rule = function() {
			$scope.changeView.ruleHomeShow = true;
		}

		$scope.rule_editor_page = function() {
			$scope.changeView.ruleEditPage = true;
			$scope.changeView.expressionEditPage = false;
			$scope.changeView.actionEditPage = false;
		}

		$scope.expression_editor_page = function() {
			$scope.changeView.ruleEditPage = false;
			$scope.changeView.expressionEditPage = true;
			$scope.changeView.actionEditPage = false;
			$scope.staticJson();
		}

		$scope.action_editor_page = function() {
			$scope.changeView.ruleEditPage = false;
			$scope.changeView.expressionEditPage = false;
			$scope.changeView.actionEditPage = true;
		}

		$scope.staticJson = function() {
			$http.get('app/rule/static.json')
				.success (function(data) {
					$scope.staticValues = data;
					}).error (function(error) {
				});
		}

		$scope.submit = function(conditions) {
			conditions.operator = $scope.operatorToMongodbMapping(conditions.operator);
			$scope.condition.operator = $scope.MongodbToOperatorMapping(conditions.operator);
			var object1 = {};
			object1[conditions.operator] = conditions.value;
			var object2 = {};
			object2[conditions.key] = object1;
			var object3 = {};
			object3['condition'] = object2;
			rule.save({url:'rule'}, object3).$promise.then(function(data){
				if(data.statusCode != 403) {
					growl.success('rule created succesfully');	
				}
				else {
					growl.error(data.message);	
				}
			}).catch(function(error){
				growl.error('Oops! Something went wrong');
			});
		}

		$scope.operatorToMongodbMapping = function(operator) {
			if(operator){
				switch(operator){
					case "equal":
						return "$eq";
					case "not_equal":
						return "$nq";
					case "in_array":
						return "$in";
					case "not_in_array":
						return "$nin";
					case "less_than":
						return "$lt";
					case "less_than_or_equal":
						return "$lte";
					case "greater_than":
						return "$gt";
					case "greater_than_or_equal":
						return "$gte";
				}
			}
		}
		$scope.MongodbToOperatorMapping = function(operator) {
			if(operator){
				switch(operator){
					case "$eq":
						return "equal";
					case "$nq":
						return "not_equal";
					case "$in":
						return "in_array";
					case "$nin":
						return "not_in_array";
					case "$lt":
						return "less_than";
					case "$lte":
						return "less_than_or_equal";
					case "$gt":
						return "greater_than";
					case "$gte":
						return "greater_than_or_equal";
				}
			}
		}
	}]
)