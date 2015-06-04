app.directive('myRows', function ($compile,$parse) {
    return {
        restrict: 'AE',
        link: function (scope, element, attrs) {
    var html = '<div class="form-inline" ng-repeat="data in datas" style="margin-bottom:10px;">'+
	  '<div class="form-group mb-left">'+
	    '<select class="form-control" ng-init="data.collectionName = \'product\'" ng-model="data.collectionName" disabled>'+
                '<option value="">choose one</option>'+
                '<option value="product">product</option>'+
         '</select>'+
	  '</div>'+
	  '<div class="form-group mb-left">'+
	    '<select class="form-control" ng-model="data.key" ng-options = "s.field as s.field for s in staticValues" ng-change="checkType(data.key, data.indexOf(data))" required>'+
                '<option value="">choose one</option>'+
            '</select>'+
	  '</div>'+
	  '<div class="form-group mb-left" ng-show="arrayObject">'+
	    '<select class="form-control" ng-model="data.objectArray" ng-options = "s.field as s.field for s in arrayValue">'+
                '<option value="">choose one</option>'+
         '</select>'+
	  '</div>'+
	  '<div class="form-group mb-left">'+
	    '<select class="form-control" ng-model="data.operator.name" ng-options="s.name as s.name for s in fields"  required>'+
         '</select>'+
	  '</div>'+
	  '<div class="form-group mb-left" ng-if="data.operator.name ==\'equalTo\' || data.operator.name ==\'notEqualTo\' || data.operator.name ==\'greaterThan\' || data.operator.name ==\'exists\'">'+
	    '<input type="text" class="form-control" ng-model="data.value"  required>'+
	  '</div>'+
	  '<div class="form-group mb-left" ng-if="data.operator.name ==\'equalTo\'">'+
	     '<select class="form-control" ng-model="data.objectArray" ng-options = "s.field as s.field for s in arrayValue" >'+
                '<option value="">choose one</option>'+
          '</select>'+
	  '</div>'+
	  '<div class="form-group mb-left">'+
            '<button ng-click="deleteRow(indexOf(data))"><span class="glyphicon glyphicon-trash" ng-model="data.delete" aria-hidden="true"></span></button>'+
        '</div>'+

    '</div>';
           
        scope.datas = [];
        var results = angular.element('<div></div>')
        var recursive = function(rows) {
                angular.forEach(rows, function(row, index) {
                   if(row.rows.length == 0){
                   	scope.datas.push(row);
                   }
                   
                    if(row.rows.length>0) {
                        recursive(row.rows);
                    }
                })
            }
            if(scope.getRuleData && scope.getRuleData.rows) {
                recursive(scope.getRuleData.rows);
            }
 			var result = $compile(html)(scope);
         	element.html(result);
            //$compile(element.contents())(scope);
        }
    }
});