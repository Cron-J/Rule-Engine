app.controller('ruleCtrl', [ '$scope', '$http','$location', 'growl',
	function($scope, $http, $location,  growl){
		$scope.changeView.ruleEditPage = true;
		$scope.changeView.expressionEditPage = false;
		$scope.changeView.actionEditPage = false;

		$scope.add_new_rule = function(){
			$scope.changeView.ruleHomeShow = true;
		}

		$scope.rule_editor_page = function(){
			$scope.changeView.ruleEditPage = true;
			$scope.changeView.expressionEditPage = false;
			$scope.changeView.actionEditPage = false;
			console.log("Hi");
		}

		$scope.expression_editor_page = function(){
			$scope.changeView.ruleEditPage = false;
			$scope.changeView.expressionEditPage = true;
			$scope.changeView.actionEditPage = false;
			console.log("null");
		}

		$scope.action_editor_page = function(){
			$scope.changeView.ruleEditPage = false;
			$scope.changeView.expressionEditPage = false;
			$scope.changeView.actionEditPage = true;
			console.log("In action");
		}
	}]
)