'use strict'
var evaluatedFunction;
app.controller('ruleCtrl', ['$scope', '$http', '$location', 'growl', 'rule',
    function($scope, $http, $location, growl, rule) {
        var _scope = {};
        $scope.arrayValue = {};

        function condition() {
            this.keys = '',
                this.operator = '',
                this.value = ''
        }

        function subcondition() {
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
            $scope.staticJson();
            initializeConditions();
        }
        $scope.add_new_rule = function() {
            $scope.changeView.ruleHomeShow = true;
            $scope.showButton = false;
            // $scope.changeView.ruleEditShow = false;
        }
        $scope.editRule1 = function() {
            $scope.changeView.ruleHomeShow = true;
            $scope.showButton = true;
            $scope.showDetails = true;
        }

        $scope.staticJson = function() {
            $http.get('http://modulus-linkup-45480.onmodulus.net/getProductSchema')
                .success(function(data) {
                    $scope.staticValues = data.attributes;
                }).error(function(error) {});
        }

        $scope.checkType = function(keyvalue) {
            if (keyvalue) {
                for (var key in $scope.staticValues) {
                    if ($scope.staticValues[key]['field'] === keyvalue) {
                        if ($scope.staticValues[key]['values']) {
                            $scope.arrayObject = true;
                            $scope.arrayValue[keyvalue] = $scope.staticValues[key]['values'];
                            break;
                        } else {
                            $scope.arrayObject = false;
                            $scope.arrayObject = undefined;
                        }
                    }
                }
            }
        }

        function recursiveFunction(subcondition) {
            for (var i in subcondition.conditions) {
                if (subcondition.conditions[i].objectArray) {
                    var subdoc = subcondition.conditions[i].objectArray;
                    subcondition.conditions[i].keys = subcondition.conditions[i].key + '.' + subdoc;
                }
            }
            for (var i in subcondition.subconditions) {
                 if(subcondition.subconditions[i].subconditions.length>0){
                    recursiveFunction(subcondition.subconditions[i])
                }
                if(subcondition.subconditions[i].conditions.length>0){
                    recursiveFunction(subcondition.subconditions[i])
                }
            }
        }
        $scope.submit = function() {
            recursiveFunction($scope.expressions[0]);
            var data = {
                name :$scope.ruleName,
                description: "Rule number " + Math.floor((Math.random() * 200)), //rule selection
                jsonExpression: angular.toJson($scope.expressions),
                status: 'live',
                jsExpression: toJSExpression($scope.expressions)
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
                    $scope.ruleName=data.name;
                    $scope.expressions = JSON.parse(data.jsonExpression);
                    getrecursiveEditRule($scope.expressions[0]);
                    growl.success('Get the rule By Id');
                } else {
                    growl.error(data.message);
                }
            }).catch(function(error) {
                growl.error('oops! something went wrong');
            });
        }

        function getrecursiveEditRule(subcondition) {
            for (var i in subcondition.conditions) {
                if (subcondition.conditions[i].key) {
                    $scope.checkType(subcondition.conditions[i].key);

                }
            }
            for (var i in subcondition.subconditions) {
                if(subcondition.subconditions[i].subconditions.length>0){
                    getrecursiveEditRule(subcondition.subconditions[i])
                }
                if(subcondition.subconditions[i].conditions.length>0){
                    getrecursiveEditRule(subcondition.subconditions[i])
                }
                
            }
        }

        $scope.updateRule = function() {
            var Updateddata = {
                jsonExpression: angular.toJson($scope.expressions), //rule update
                jsExpression: toJSExpression($scope.expressions)
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

        // function seprate(subcondition) {
        //     var printTrees = '';
        //     var andor = subcondition.allany == "all" ? " && " : " || "
        //     for (var i in subcondition.conditions) {
        //         var condition = subcondition.conditions[i];
        //         if(condition.keys)
        //         printTrees +=
        //             '(' +
        //             'product.' + condition.keys + ' ' +
        //             $scope.fields[condition.operator].JS + ' ' +
        //             '"' + condition.value + '"' + ' ' + //if DateTime then new Date, if string then
        //             ')' + andor;
        //         else{
        //             printTrees +=
        //             '(' +
        //             'product.' + condition.key + ' ' +
        //             $scope.fields[condition.operator].JS + ' ' +
        //             '"' + condition.value + '"' + ' ' + //if DateTime then new Date, if string then
        //             ')' + andor;
        //         }
        //     }
        //     for (var i in subcondition.subconditions) {
        //         var subcondition = subcondition.subconditions[i];
        //         printTrees += '(' + seprate(subcondition) + ')' + andor;
        //     }
        //     //trim the last andor
        //     if (printTrees.length > 4)
        //         printTrees = printTrees.substr(0, printTrees.length - 4);
        //     return printTrees;
        // }

        function separate(subcondition) {
            var printTrees = '';
            var andor = subcondition.allany == "all" ? " && " : " || "
            for (var i in subcondition.conditions) {
                var condition = subcondition.conditions[i];
                if(condition.keys)
                printTrees +=
                    '(' +
                    'product.' + 
                   $scope.fields[condition.operator].toJSExpression(condition.keys,condition.value) + ' ' + //if DateTime then new Date, if string then
                    ')' + andor;
                else{
                     printTrees +=
                    '(' +
                    'product.' + 
                   $scope.fields[condition.operator].toJSExpression(condition.key,condition.value) + ' ' + //if DateTime then new Date, if string then
                    ')' + andor;
                }
            }
            for (var i in subcondition.subconditions) {
                var subcondition = subcondition.subconditions[i];
                printTrees += '(' + separate(subcondition) + ')' + andor;
            }
            //trim the last andor
            if (printTrees.length > 4)
                printTrees = printTrees.substr(0, printTrees.length - 4);
            return printTrees;
        }


        function toJSExpression(expressions) {
            var printTree = "function productMatchedExpression(object){"
            printTree += 'return ' + '(' + separate(expressions[0]) + ');';

            printTree += "}";
            console.log(printTree);
            return printTree;
        }
        $scope.aggregatorFunction = function(){
            $scope.getaggregatorFields = {
                all:"all",
                any:"any"
            }
        }
        function initializeConditions() {
            $scope.fields = {
                exists: {
                    label: "exists",
                    name: "exists",
                    fieldType: "none",
                    //JS:"",
                    toJSExpression: function(keystring, valuestring){
                            return keystring + "" + valuestring
                        }
                },
                empty: {
                    label: "empty",
                    name: "empty",
                    fieldType: "none",
                    //JS:"",
                    toJSExpression: function(keystring, valuestring){
                            return keystring + "none" + valuestring
                        }

                },
                equalTo: {
                    label: "equal to",
                    name: "equalTo",
                    fieldType: "text",
                    //JS:"===",
                    toJSExpression: function(keystring, valuestring){
                            return keystring + "===" + valuestring
                        }
                },
                notEqualTo: {
                    label: "not equal to",
                    name: "notEqualTo",
                    fieldType: "text",
                    //JS:"!==",
                    toJSExpression: function(keystring, valuestring){
                            return keystring + "!==" + valuestring
                        }
                },
                greaterThan: {
                    label: "greater than",
                    name: "greaterThan",
                    fieldType: "number",
                    //JS:">",
                    toJSExpression: function(keystring, valuestring){
                            return keystring + ">" + valuestring
                        }
                },
                greaterThanEqual: {
                    label: "greater than equal",
                    name: "greaterThanEqual",
                    fieldType: "number",
                    //JS:"=>",
                    toJSExpression: function(keystring, valuestring){
                            return keystring + "=>" + valuestring
                    }
                },
                lessThan: {
                    label: "less than",
                    name: "lessThan",
                    fieldType: "number",
                    // JS: "<",
                    toJSExpression: function(keystring, valuestring){
                            return keystring + "<" + valuestring
                    }
                },
                lessThanEqual: {
                    label: "less than equal",
                    name: "lessThanEqual",
                    fieldType: "number",
                    //JS:"<=",
                    toJSExpression: function(keystring, valuestring){
                            return keystring + "<=" + valuestring
                    }
                },
                endswith: {
                    label: "ends with",
                    name: "endswith",
                    fieldType: "date",
                    //JS:"",
                    toJSExpression: function(keystring, valuestring){
                            return keystring + "" + valuestring
                    }
                },
                startswith: {
                    label: "starts with",
                    name: "startswith",
                    fieldType: "date",
                    toJSExpression: function(keystring, valuestring){
                            return keystring + "" + valuestring
                    }
                },
                contains: {
                    label: "contains",
                    name: "contains",
                    fieldType: "text",
                    //JS:"",
                    toJSExpression: function(keystring, valuestring){
                            return keystring + "" + valuestring
                    }
                },
                isnotEmpty: {
                    label: "isnot Empty",
                    name: "isnotEmpty",
                    fieldType: "text",
                    //JS:"",
                    toJSExpression: function(keystring, valuestring){
                            return keystring + "" + valuestring
                    }
                }
            }

        }
        _scope.init();
    }
])