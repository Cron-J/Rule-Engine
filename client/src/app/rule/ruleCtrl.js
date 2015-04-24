app.controller('ruleCtrl', [ '$scope', '$http','$location', 'growl',
	function($scope, $http, $location,  growl){

		$scope.add_new_rule = function(){
			$scope.changeView.ruleHomeShow = true;
		}

		$scope.rule_editor_page = function(){
			// $scope.changeView.ruleHomeShow = true;
			$scope.changeView.ruleEditorShow = true;
		}
	}]
)