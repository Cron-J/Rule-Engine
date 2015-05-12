app.controller('ruleCtrl', [ '$scope', '$http','$location', 'growl', 'rule',
	function($scope, $http, $location,  growl, rule) {
		$scope.changeView.ruleEditPage = true;
		$scope.changeView.expressionEditPage = false;
		$scope.changeView.actionEditPage = false;

		$scope.add_new_rule = function() {
			$scope.changeView.ruleHomeShow = true;
		}

		$scope.rows =	{	condition: '',
							values: [{	collectionName: '',
										key: '',
										arrayObject: '',
										objectArray: '',
										operator: '',
										value: '',
										rows: {}
									}]
        				}
	        			


		$scope.addExpression = function(data) {
			data.push({
				collectionName: '',
				key: '',
				arrayObject: '',
				objectArray: '',
				operator: '',
				value: '',
				rows: {}
	        });
	        console.log(data);
		}

		$scope.deleteRow = function(rowNumber) {
			$scope.rows.splice(rowNumber, 1);
		}
		$scope.conditions = [];
		$scope.addSubExpression = function(row) {
		console.log(row);	
			row.rows['condition'] = '';
			row.rows['values'] = [];
			// $scope.rows[$scope.rows.length-1].rows.push({
			// 	condition: '',
			// 	conditionValue: true
			// });
		}

		$scope.addExpressionOfSub = function(rowIndex) {
			$scope.rows[rowIndex].rows.push({
				collectionName: '',
				key: '',
				arrayObject: '',
				objectArray: '',
				operator: '',
				value: '',
				condition: '',
				rows: []
			});
		}
		$scope.deleteSubExpression = function(rowIndex, subRowIndex) {
			$scope.rows[rowIndex].rows.splice(subRowIndex, 1);
		}
		$scope.ruleEditorPage = function() {
			$scope.changeView.ruleEditPage = true;
			$scope.changeView.expressionEditPage = false;
			$scope.changeView.actionEditPage = false;
		}

		$scope.expressionEditorPage = function() {
			$scope.changeView.ruleEditPage = false;
			$scope.changeView.expressionEditPage = true;
			$scope.changeView.actionEditPage = false;
			$scope.staticJson();
		}

		$scope.actionEditorPage = function() {
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
		$scope.staticJson();
		$scope.checkType = function(keyvalue, index) {
			if(keyvalue){
				for(var key in $scope.staticValues){
					if($scope.staticValues[key]['field'] === keyvalue){
						if($scope.staticValues[key]['values']){
							$scope.rows[index].arrayObject = true;
							$scope.arrayValue = $scope.staticValues[key]['values'];
							break;
						}
						else{
							$scope.rows[index].arrayObject = false;
							$scope.rows[index].arrayObject = undefined;
						}
					}
				}
			}
		}

		$scope.submit = function(conditions) {
			if($scope.conditionForm.$valid) {
				conditions.operator = $scope.operatorToMongodbMapping(conditions.operator);
				var object1 = {};
				object1[conditions.operator] = conditions.value;
				var object2 = {};
				if(conditions.arrayObject) {
					object2[conditions.key+"."+conditions.arrayObject] = object1;
				}
				else { 
					object2[conditions.key] = object1;
				}
				var object3 = {};
				object3['condition'] = object2;
				$scope.condition.operator = $scope.MongodbToOperatorMapping(conditions.operator);
				console.log(object3);
				rule.save({url:'rule'}, object3).$promise.then(function(data){
					if(data.statusCode != 403) {
						growl.success('rule created succesfully');	
					}
					else {
						growl.error(data.message);	
					}
				}).catch(function(error){
					growl.error('oops! something went wrong');
				});
			}
			else {
				growl.error('please enter valid section');
			}
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
					case "exists":
						return "$exists";
					case "type":
						return "$type";
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
					case "$exists":
						return "exists";
					case "$type":
						return "type";
				}
			}
		}
	}]
)