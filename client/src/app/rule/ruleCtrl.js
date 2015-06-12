'use strict'
var evaluatedFunction;
app.controller('ruleCtrl', ['$scope', '$http', '$location', 'growl', 'rule',
    function($scope, $http, $location, growl, rule) {
        $scope.changeView.ruleEditPage = true;
        $scope.changeView.expressionEditPage = false;
        $scope.changeView.actionEditPage = false;
        var _scope = {};
        function condition(){
            this.key = '',
            this.operator = '',
            this.value = ''
        }
        function subcondition(){
            this.allany = 'all',
            this.conditions = [new condition()],
            this.subconditions = []
        }
        // $scope.expressions = myExpression;
        $scope.expressions = [new subcondition()];
        $scope.addExpression = function(data) {
            data.conditions.push(new condition());
        }
        $scope.addSubExpression = function(data) {
            data.subconditions.push(new subcondition());
        }
        $scope.deleteSubExpression = function(data, parent) {
            parent.parent.subconditions.splice(parent.parent.subconditions.indexOf(data), 1);
        }
        $scope.deleteExpression = function(data, parent) {
            parent.splice(parent.indexOf(data), 1);
        }
        _scope.init = function() {
            initializeConditions();
        }
        $scope.add_new_rule = function() {
            $scope.changeView.ruleHomeShow = true;
            $scope.changeView.ruleUpdateShow = false;
            $scope.showButton = false;
            $scope.changeView.ruleEditShow = false;
        }
        $scope.editRule1 = function() {
            $scope.changeView.ruleEditShow = true;
            $scope.changeView.ruleUpdateShow = false;
            $scope.changeView.ruleHomeShow =true;
            $scope.showButton = true;
            $scope.showDetails=true;
            $scope.staticJson();
            $scope.checkType();

        }

        $scope.staticJson = function() {
            $http.get('http://modulus-linkup-45480.onmodulus.net/getProductSchema')
                .success(function(data) {
                    console.log('data', data);
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
            var data = {
                description: "Rule number " + Math.floor((Math.random() * 200)),//rule selection
                jsonExpression : angular.toJson($scope.expressions),
                status: 'live',
                jsExpression:toJSExpression($scope.expressions)
            }

            rule.save({
                url: 'rule'
            }, data).$promise.then(function(data) {
                if (data.statusCode != 403) {
                    $scope.ruleId = data._id;
                    //toJSExpression(angular.fromJson(data.jsonExpression));
                    growl.success('rule created succesfully');
                } else {
                    growl.error(data.message);
                }
            }).catch(function(error) {
                growl.error('oops! something went wrong');
            });
        }


        $scope.editRule = function() { //get all rule
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
        var dataID;
        $scope.getRule = function(id) { //getrule by id
            dataID = id;
            rule.getbyId({
                url: 'rule',
                id: dataID
            }).$promise.then(function(data) {
                if (data.statusCode != 403) {
                    $scope.expressions = JSON.parse(data.jsonExpression);
                    growl.success('Get the rule By Id');
                } else {
                    growl.error(data.message);
                }
            }).catch(function(error) {
                growl.error('oops! something went wrong');
            });
        }

        $scope.updateRule = function() {
            var Updateddata = {
                jsonExpression : angular.toJson($scope.expressions), //rule update
                jsExpression:toJSExpression($scope.expressions)
            };
            rule.update({
                url: 'rule',
                id: dataID
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
        function seprate(subcondition) {
            var printTrees = '';
            var andor = subcondition.allany == "all" ? " && " : " || "
            for(var i in subcondition.conditions){
                var condition = subcondition.conditions[i];
                if(!$scope.fields[condition.operator])
                    console.log("Nahi Mila", condition)
                printTrees +=
                        '(' +
                        'product.' + condition.key + ' ' +
                        $scope.fields[condition.operator].JS + ' ' +
                        '"' + condition.value + '"' + ' ' + //if DateTime then new Date, if string then
                        ')' + andor;
            }
            for(var i in subcondition.subconditions){
                var subcondition = subcondition.subconditions[i];
               printTrees += '(' + seprate(subcondition) + ')' + andor;
            }
            //trim the last andor
            if(printTrees.length > 4)
                printTrees = printTrees.substr(0, printTrees.length - 4);
            return printTrees;
        }


        function toJSExpression(expressions) {
            var printTree = "function productMatchedExpression(object){"
            printTree += 'return ' + '(' + seprate(expressions[0]) + ');';

            printTree += "}";
            console.log(printTree);
            return printTree;
        }
        function initializeConditions() {
            $scope.fields = {
                exists: {
                    label: "exists",
                    name: "exists",
                    fieldType: "none",
                    JS: ""
                },
                empty: {
                    label: "empty",
                    name: "empty",
                    fieldType: "none",
                    JS: 'none',
                    
                },
                equalTo: {
                    label: "equal to",
                    name: "equalTo",
                    fieldType: "select",
                    JS: "==="
                },
                notEqualTo: {
                    label: "not equal to",
                    name: "notEqualTo",
                    fieldType: "text",
                    JS: "!=="
                },
                greaterThan: {
                    label: "greater than",
                    name: "greaterThan",
                    fieldType: "text",
                    JS: ">"
                },
                greaterThanEqual: {
                    label: "greater than equal",
                    name: "greaterThanEqual",
                    fieldType: "text",
                    JS: "=>"
                },
                lessThan: {
                    label: "less than",
                    name: "lessThan",
                    fieldType: "text",
                    JS: "<"
                    // ,toJSExpression: function(keystring, valuestring){
                    //     return keystring + "<" + valuestring
                    // }
                },
                lessThanEqual: {
                    label: "less than equal",
                    name: "lessThanEqual",
                    fieldType: "text",
                    JS: "<="
                },
                endswith: {
                    label: "ends with",
                    name: "endswith",
                    fieldType: "text",
                    JS: ""
                },
                startswith: {
                    label: "starts with",
                    name: "startswith",
                    fieldType: "text",
                    JS: ""
                },
                contains: {
                    label: "contains",
                    name: "contains",
                    fieldType: "text",
                    JS: ""
                },
                isnotEmpty: {
                    label: "isnot Empty",
                    name: "isnotEmpty",
                    fieldType: "text",
                    JS: ""
                }
            }

        }
        _scope.init();
    }
])