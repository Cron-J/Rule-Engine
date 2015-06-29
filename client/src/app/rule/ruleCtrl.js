'use strict'
var evaluatedFunction;
app.controller('ruleCtrl', ['$scope', '$http', '$location', 'growl', 'rule', '$routeParams','StaticDataService',
    function($scope, $http, $location, growl, rule, $routeParams,StaticDataService) {

        var _scope = {};

        function key(field) {
            this.field = field,
                this.aggregator = undefined
        }

        function condition() {
            this.keys = [new key()],
                this.operator = '',
                this.value = ''
        }

        function subcondition() {
                this.allany = 'all',
                    this.conditions = [new condition()],
                    this.subconditions = []
            }
            // $scope.expressions = myExpression;
        $scope.expressions = [];
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
            StaticDataService.Operators;
            if ($routeParams.id) {
                $scope.getRule($routeParams.id);
            }
        }
        $scope.operators = StaticDataService.Operators;
        $scope.aggregators = StaticDataService.Aggregators;
        $scope.getRouteId = $routeParams.id;
        $scope.add_new_rule = function() {
            $scope.changeView.ruleHomeShow = true;
            $scope.showButton = false;
            $scope.show = true;
            // $scope.changeView.ruleEditShow = false;
        }
        $scope.editRule1 = function() {
            $scope.changeView.ruleHomeShow = true;
            $scope.showButton = true;
            $scope.showDetails = true;
        }

        $scope.staticJson = function() {
            $http.get('app/rule/staticJson.json')
                .success(function(data) {
                    $scope.schema = data;
                    $scope.expressions = [new subcondition()];
                }).error(function(error) {});
        }

        function getAttribute(field, attributes) {
            for (var i = 0; i < attributes.length; i++) {
                if (field === attributes[i].field)
                    return attributes[i];
            }
        }

        $scope.subSchema = function(condition, index) {
            var keys = condition.keys;
            var subschema = $scope.schema;
            if (index == 0)
                return subschema;
            for (var i = 0; i < keys.length && i < index; i++) {
                subschema = getAttribute(keys[i].field, subschema).attributes;
            }
            return subschema;
        }

        $scope.onFieldChange = function(condition, index) {
            var keys = condition.keys;
            keys.splice(index + 1, keys.length);
            var subschema = $scope.subSchema(condition, index + 1);
            if (subschema) {
                if (index != 0) {
                    keys[index].aggregator = $scope.aggregators.all.name;
                }


                keys.push(new key());
            } else {
                keys[index].aggregator = undefined;
            }
        }

        $scope.submit = function() {
            //recursiveFunction($scope.expressions[0]);
            var data = {
                name: $scope.ruleName,
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
                    $scope.ruleName = data.name;
                    $scope.expressions = JSON.parse(data.jsonExpression);
                    $location.path('/edit/' + id);
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

        function conditionToJSExpression(condition, index) {
            var jsExpr = 'object.';
            for (var j = index | 0; j < condition.keys.length; j++) {
                if (condition.keys[j].aggregator) {
                    var aggregator = $scope.aggregators[condition.keys[j].aggregator];
                    jsExpr += condition.keys[j].field;
                    return aggregator.toJSExpression(jsExpr, conditionToJSExpression(condition, j + 1));
                }
                else
                    jsExpr += condition.keys[j].field + '.';
            }
            if(jsExpr.length > 0)
                jsExpr = jsExpr.substr(0, jsExpr.length - 1);
            jsExpr = '(' + $scope.operators[condition.operator].toJSExpression(jsExpr, condition.value) + ')';
            return jsExpr;
        }

        function subconditionToJSExpression(subcondition) {
            var jsExpr = '';
            var andor = subcondition.allany == "all" ? " && " : " || "
            for (var i in subcondition.conditions) {
                var condition = subcondition.conditions[i];
                jsExpr += conditionToJSExpression(condition) + andor;

            }
            for (var i in subcondition.subconditions) {
                var subcondition = subcondition.subconditions[i];
                jsExpr += '(' + subconditionToJSExpression(subcondition) + ')' + andor;
            }
            //trim the last andor
            if (jsExpr.length > 4)
                jsExpr = jsExpr.substr(0, jsExpr.length - 4);
            return jsExpr;
        }

        function toJSExpression(expressions) {
            var jsExpr = "function productMatchedExpression(object){"
            jsExpr += 'return ' + '(' + subconditionToJSExpression(expressions[0]) + ');';
            jsExpr += "}";
            console.log(jsExpr);
            try{
                eval(jsExpr);
            } 
            catch(err){

            }
            return jsExpr;
        }
       
        _scope.init();
    }
])