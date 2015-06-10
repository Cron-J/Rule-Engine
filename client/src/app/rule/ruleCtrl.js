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
        $scope.deleteRow = function(index) {
             rule.delet({
                url: 'rule'
            }).$promise.then(function(data) {
                if (data.statusCode != 403) {
                   $scope.tree.splice(index);
                    growl.success('rule deleted succesfully');
                } else {
                    growl.error(data.message);
                }
            }).catch(function(error) {
                growl.error('oops! something went wrong');
            });
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
            var data ={
                rows:$scope.lines
            };

            rule.save({
                url: 'rule'
            }, data).$promise.then(function(data) {
                if (data.statusCode != 403) {
                    $scope.ruleId = data._id;
                    var s= convertJSONTOJSEXPRESSION(data);
                    var t = JSON.stringify(s);
                    console.log('s',s);
                      console.log('t',t);
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
       
        
        function initializeConditions() {
            $scope.fields = [{
                label:"exists",
                name: "exists",
                fieldType: "none",
                JS:"exists"
            }, {
                label:"empty",
                name: "empty",
                fieldType: "none",
                JS:'none',
            }, {
                label:"equalTo",
                name: "equalTo",
                fieldType: "select",
                JS:"==="
            }, {
                label:"notEqualTo",
                name: "notEqualTo",
                fieldType: "text",
                JS:"!=="
            }, {
                label:"greaterThan",
                name: "greaterThan",
                fieldType: "text",
                JS:">"
            }, {
                label:"greaterThanEqual",
                name: "greaterThanEqual",
                fieldType: "text",
                JS:"=>"
            }, {
                label:"lessThan",
                name: "lessThan",
                fieldType: "text",
                JS:"<"
            }, {
                label:"lessThanEqual",
                name: "lessThanEqual",
                fieldType: "text",
                JS:"<="
            }]

        }
         var allProductInfo = [];
        function convertJSONTOJSEXPRESSION(productInfo) {
                 if(productInfo.rows.length>0){
                traverse(productInfo.rows)
            }
            else if($scope.lines.length === 0){
                console.log('obj is empty');
            }  
            for(var i=0;i<$scope.rowsArray.length; i++){
                recursive($scope.rowsArray[i].key,$scope.rowsArray[i].operator.JS,$scope.rowsArray[i].value);
                // function recursive(){
                //     if($scope.rowsArray[i].key +' ' + $scope.rowsArray[i].operator.JS +' '+ $scope.rowsArray[i].value  )
                //         return true;
                // }
                
                // var operatorObj={};
                // var operator = $scope.rowsArray[i].operator.JS;
                // operatorObj[operator] = $scope.rowsArray[i].value;
                // var productKeyObj ={};
                // productKeyObj[$scope.rowsArray[i].key] = operatorObj;
                // var productObj = {};
                // productObj[$scope.rowsArray[i].collectionName] = productKeyObj;
                // allProductInfo.push(productObj);
            }
            //return allProductInfo;
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
   function recursive(key,operator,value){
                    if(key +' ' + operator +' '+value  )
                        return true;
                }
        

        _scope.init();
    }
])