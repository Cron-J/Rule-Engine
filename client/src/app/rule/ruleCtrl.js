'use strict'
app.controller('ruleCtrl', ['$scope', '$http', '$location', 'growl', 'rule',
    function($scope, $http, $location, growl, rule) {
        $scope.changeView.ruleEditPage = true;
        $scope.changeView.expressionEditPage = false;
        $scope.changeView.actionEditPage = false;
        var _scope = {};
        $scope.rowsArray = [];
        _scope.init = function() {
            initializeConditions();
        }

        $scope.add_new_rule = function() {
            $scope.changeView.ruleHomeShow = true;
            $scope.changeView.ruleUpdateShow=false;
            $scope.changeView.ruleEditShow = false;
        }
        $scope.editRule1 = function() {
            $scope.changeView.ruleEditShow = true;
            $scope.changeView.ruleUpdateShow=false;
            $scope.staticJson();
            $scope.checkType();

        }

        $scope.tree = [{
            conditions: [],
            rows: []
        }]

        $scope.addExpression = function(data) {
            data.rows.push({
                collectionName: '',
                key: '',
                arrayObject: '',
                objectArray: '',
                operator: '',
                value: '',
                rows: []
            });
        }
        $scope.addSubExpression = function(data) {
            data.rows.push({
                conditions: [],
                rows: []
            });
        }
        $scope.deleteRow = function(rowNumber) {
            $scope.rows.splice(rowNumber, 1);
        }
        $scope.conditions = [];

        $scope.deleteSubExpression = function(data) {
            data.rows = [];
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
            $http.get('http://modulus-linkup-45480.onmodulus.net/getProductSchema')
                .success(function(data) {
                	console.log('data',data);
                    $scope.staticValues = data.attributes;
                }).error(function(error) {});
        }
        $scope.staticJson();
        $scope.checkType = function(keyvalue) {
            if (keyvalue) {
                for (var key in $scope.staticValues) {
                    if ($scope.staticValues[key]['field'] === keyvalue) {
                        if ($scope.staticValues[key]['values']) {
                            $scope.arrayObject = true;
                            $scope.arrayValue = $scope.staticValues[key]['values'];
                            break;
                        } else {
                            $scope.arrayObject = false;
                            $scope.arrayObject = undefined;
                        }
                    }
                }
            }
        }
         var allProductInfo = [];
        function mappingInfo(){
            // traverse($scope.lines);
            if($scope.lines.length>0){
                traverse($scope.lines)
            }
            else if($scope.lines.length === 0){
                console.log('obj is empty');
            }
            console.log('$scope.rowsArray',$scope.rowsArray)
            for(var i=0;i<$scope.rowsArray.length; i++){
                var operatorObj={};
                 // var operatorInstance = new Operator($scope.lines[i].operator.name,$scope.lines[i].operator.label,$scope.lines[i].operator.fieldType);
                 // var f= new $scope.lines[i]['operator']['name']();
                 // var operator = operatorInstance.ToJSExpression();
                 //operatorInstance[]
                var operator = $scope.operatorToJSExpression($scope.rowsArray[i].operator.name);
                operatorObj[operator] = $scope.rowsArray[i].value;
                var productKeyObj ={};
                productKeyObj[$scope.rowsArray[i].key] = operatorObj;
                var productObj = {};
                productObj[$scope.rowsArray[i].collectionName] = productKeyObj;
                allProductInfo.push(productObj);
            }
           return allProductInfo;
        } 

        $scope.submit = function(conditions) {
            
        	 $scope.condition={};
             $scope.lines =[];
        	console.log('conditions',conditions);
        	for(var i=0; i<conditions.length; i++){
        		for(var j= 0; j<conditions[i].rows.length; j++) {
        			var myoperator = conditions[i].rows[j];
        			$scope.lines.push(myoperator);
        		}
        		
        	}
           var d = mappingInfo();
            var data ={
                condition:d,
                rows:$scope.lines
            };

            rule.save({
                url: 'rule'
            }, data).$promise.then(function(data) {
                if (data.statusCode != 403) {
                    $scope.ruleId = data._id;
                    growl.success('rule created succesfully');
                } else {
                    growl.error(data.message);
                }
            }).catch(function(error) {
                growl.error('oops! something went wrong');
            });
        }


        $scope.editRule = function(){
             rule.get({
                url: 'rule'
            }).$promise.then(function(data) {
                if (data.statusCode != 403) {
                    $scope.allData = data;
                } else {
                    growl.error(data.message);
                }
            }).catch(function(error) {
                growl.error('oops! something went wrong');
            });
        }

        $scope.getRule = function(id){
             rule.getbyId({
                url: 'rule',id:id
            }).$promise.then(function(data) {
                if (data.statusCode != 403) {
                    $scope.getRuleData = data;
                    $scope.changeView.ruleUpdateShow=true;
                    growl.success('Get the rule By Id');
                } else {
                    growl.error(data.message);
                }
            }).catch(function(error) {
                growl.error('oops! something went wrong');
            });
        }

        $scope.updateRule = function(data){
            $scope.lines = data.rows;
            var d = mappingInfo();
            var Updateddata ={
                condition:d,
                rows:$scope.lines
            };
            rule.update({
                url: 'rule' ,id:data._id
            }, Updateddata).$promise.then(function(data) {
                if (data.statusCode != 403) {
                    growl.success('rule updated succesfully');
                } else {
                    growl.error(data.message);
                }
            }).catch(function(error) {
                growl.error('oops! something went wrong');
            });
        }
       
        function traverse(obj) {
            if (!obj) return;
            var i = 0;
                while(i < obj.length){
                    recur(obj[i]);
                    i++;
                }
            
        }

        function recur(obj){
            if(obj.rows.length>0){
                traverse(obj.rows)
            }
            else if(obj.rows.length === 0){
                $scope.rowsArray.push(obj);
            }
        }
        function initializeConditions() {
            $scope.fields = [{
                label:"exists",
                name: "exists",
                fieldType: "none"
            }, {
                label:"empty",
                name: "empty",
                fieldType: "none"
            }, {
                label:"equalTo",
                name: "equalTo",
                fieldType: "select"
            }, {
                label:"notEqualTo",
                name: "notEqualTo",
                fieldType: "text"
            }, {
                label:"greaterThan",
                name: "greaterThan",
                fieldType: "text"
            }, {
                label:"greaterThanEqual",
                name: "greaterThanEqual",
                fieldType: "text"
            }, {
                label:"lessThan",
                name: "lessThan",
                fieldType: "text"
            }, {
                label:"lessThanEqual",
                name: "lessThanEqual",
                fieldType: "text"
            }]

        }
  
        // function OperatorClass(name,label,fieldType){
        //     this.name = name;
        //     this.label = label;
        //     this.fieldType = fieldType;
        //     this.ToJSExpression = function(){
        //         return this[name];
        //     }
        // }

        // class Operator {
        //     constructor(name,label,fieldType){
        //         this.name = name;
        //         this.label = label;
        //         this.fieldType = fieldType;
        //     }
        //       ToJSExpression () {
        //          return '(' + this.name + ', ' + this.fieldType + ')';
        //       }
        // }

        // class greaterThan extends Operator {
        //     ToJSExpression(name,fieldType) {
        //     return this.name + ">" + this.fieldType;
        //   }
        // }
        // class lessThan extends Operator {
        //   //   ToJSExpression(name,fieldType) {
        //   //   return this.name + ">" + this.fieldType;
        //   // }
        // }
        // class equalTo extends Operator {
        //   //   ToJSExpression(name,fieldType) {
        //   //   return this.name + ">" + this.fieldType;
        //   // }
        // }
        // class notEqualTo extends Operator {
        //   //   ToJSExpression(name,fieldType) {
        //   //   return this.name + ">" + this.fieldType;
        //   // }
        // }

        // // OperatorClass.prototype = {
        // //     present: function() {
        // //       return !!actual;
        // //     },
        // //     blank: function() {
        // //       return !actual;
        // //     },
        // //     equalTo: function() {
        // //       return "===";
        // //     },
        // //     empty: function() {
        // //       return $empty;
        // //     },
        // //     notEqualTo: function() {
        // //       return "!==";
        // //     },
        // //     greaterThan: function() {
        // //       return  ">";
        // //     },
        // //     greaterThanEqual: function() {
        // //       return  ">=";
        // //     },
        // //     lessThan: function() {
        // //       return "<";
        // //     },
        // //     lessThanEqual: function() {
        // //       return "<=";
        // //     }
        // // };



            $scope.operatorToJSExpression = function(operator) {
            	if(operator){
            		switch(operator){
            			case "equalTo":
            				return "===";
            			case "notEqualTo":
            				return "!==";
            			case "lessThan":
            				return "<";
            			case "lessThanEqual":
            				return "<=";
            			case "greaterThan":
            				return ">";
            			case "greaterThanEqual":
            				return ">=";
            			case "empty":
            				return "^$";
            			case "exists":
            				return "exists";
            		}
            	}
            }
            // $scope.MongodbToOperatorMapping = function(operator) {
            // 	if(operator){
            // 		switch(operator){
            // 			case "$eq":
            // 				return "equal";
            // 			case "$nq":
            // 				return "not_equal";
            // 			case "$in":
            // 				return "in_array";
            // 			case "$nin":
            // 				return "not_in_array";
            // 			case "$lt":
            // 				return "less_than";
            // 			case "$lte":
            // 				return "less_than_or_equal";
            // 			case "$gt":
            // 				return "greater_than";
            // 			case "$gte":
            // 				return "greater_than_or_equal";
            // 			case "$exists":
            // 				return "exists";
            // 			// case "$type":
            // 			// 	return "type";
            // 		}
            // 	}
            // }

        _scope.init();
    }
])