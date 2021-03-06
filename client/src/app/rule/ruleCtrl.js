'use strict'
app.controller('ruleCtrl', ['$scope', '$http', '$location', 'growl', '$routeParams', 'rule','operatorList','aggregatorList',
    function($scope, $http, $location, growl, $routeParams, rule, operatorList, aggregatorList) {
        var _scope = {}, dataID;
        $scope.rule = new Rule();
        $scope.getRouteId = $routeParams.id;

        //TODO: shift inside subcondition class
        $scope.addExpression = function(data) {
            data.conditions.push(new Condition());
        }
        $scope.addSubExpression = function(data) {
            data.subconditions.push(new Subcondition());
        }
        $scope.deleteSubExpression = function(data, parent) {
            parent.parent.subconditions.splice(parent.parent.subconditions.indexOf(data), 1);
        }
        $scope.deleteExpression = function(data, parent) {
            parent.splice(parent.indexOf(data), 1);
        }

        $scope.addNewRule = function() {
            $scope.changeView.ruleHomeShow = true;
            $scope.showButton = false;
            $scope.show = true;
        }
        $scope.editRule = function() {
            $scope.changeView.ruleHomeShow = true;
            $scope.showButton = true;
            $scope.showDetails = true;
        }
        $scope.getSchema = function() {
            $http.get('app/rule/staticJson.json')
                .success(function(data) {
                    $scope.schema = data;
                    $scope.rule = new Rule($scope.schema[0].field);
                }).error(function(error) {});
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
                if (index != 0)
                    keys[index].aggregatorId = $scope.aggregators.all.id;
                keys.push(new Key());
            } else {
                keys[index].aggregatorId = undefined;
            }
        }
        $scope.submit = function() {
            var data = {
                name: $scope.ruleName,
                jsonExpression: angular.toJson($scope.rule),
                jsFunction: $scope.rule.filterFunction()
            }

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
        $scope.getAllRule = function() { //get all rule
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
        $scope.getRuleById = function(id) { //getrule by id
            dataID = id;
            rule.getbyId({
                url: 'rule',
                id: dataID
            }).$promise.then(function(data) {
                if (data.statusCode != 403) {
                    $scope.ruleName = data.name;
                    $scope.rule = JSON.parse(data.jsonExpression);
                    growl.success('Get the rule By Id');
                } else {
                    growl.error(data.message);
                }
            }).catch(function(error) {
                growl.error('oops! something went wrong');
            });
        }
        $scope.updateRule = function() {
            var updateDdata = {
                jsonExpression: angular.toJson($scope.rule),
                jsFunction:$scope.rule.filterFunction() //rule update
            };
            rule.update({
                url: 'rule',
                id: dataID
            }, updateDdata).$promise.then(function(data) {
                if (data.statusCode != 403) {
                    growl.success('rule updated succesfully');
                } else {
                    growl.error(data.message);
                }
            }).catch(function(error) {
                growl.error('oops! something went wrong');
            });
        }
        $scope.getFilteredRule = function() {;
            var data = {
                jsFunction: $scope.rule.filterFunction()
            }
            $scope.loading = true;
            $http.post('getFilteredProduct', data)
                .success(function(data) {
                    $scope.filteredProduct = data;
                    growl.success('{0} products matched.'.format(data.length));
                    $scope.loading = false;
                }).error(function(error) {
                    $scope.loading = false;
                });
        }

        function getOperators() {
            $scope.operators = operatorList;
            operators = operatorList;
        }
        function getAggregators() {
           $scope.aggregators = aggregators;
           aggregators = aggregatorList;
        }
        function getAttribute(field, attributes) {
            for (var i = 0; i < attributes.length; i++) {
                if (field === attributes[i].field)
                    return attributes[i];
            }
        }

        _scope.init = function() {
            $scope.getSchema();
            getOperators();
            getAggregators();
            if ($routeParams.id) {
                $scope.getRule($routeParams.id);
            }
        }
        _scope.init();
    }
])