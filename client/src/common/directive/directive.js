app.directive('customFields', function($compile) {
    return {

        link: function(scope, el, attrs) {
            var cont = '<span></span>'
            cont = angular.element(cont);
            scope.$watchGroup(['condition.operatorId', 'condition.keys[scope.condition.keys.length - 1].field'], function() {
                cont.empty();
                el.empty();
                if (scope.condition.operator !== '') {
                    var categoryObj = scope.schema;
                    var category;
                    for (var i = 0; i < categoryObj[0].attributes.length; i++) {
                        if (!categoryObj[0].attributes[i].attributes) {
                            if (scope.condition.keys[scope.condition.keys.length - 1].field == categoryObj[0].attributes[i].field) {
                                category = categoryObj[0].attributes[i];
                            }
                        } else {
                            for (var j = 0; j < categoryObj[0].attributes[i].attributes.length; j++) {
                                if (scope.condition.keys[scope.condition.keys.length - 1].field == categoryObj[0].attributes[i].attributes[j].field) {
                                    category = categoryObj[0].attributes[i].attributes[j];
                                }
                            }
                        }

                    }
                    switch (scope.operators[scope.condition.operatorId].valueType) {
                        case 'data':
                            if (category.instance == "String") {
                                cont.append('<input type="text" class="form-control" ng-model="condition.value"/>');
                                $compile(cont)(scope);
                                el.append(cont);
                                break;
                            }
                            if (category.instance == "Number") {
                                cont.append('<input type="number" class="form-control" ng-model="condition.value"/>');
                                $compile(cont)(scope);
                                el.append(cont);
                                break;
                            }
                            if (category.instance == "Date") {
                                cont.append('<input type="date" class="form-control" datepicker-popup ng-model="condition.value" is-open="opened" min-date="minDate"  datepicker-options="dateOptions" date-disabled="disabled(date, mode)"/>');
                                $compile(cont)(scope);
                                el.append(cont);
                                break;
                            }
                            if (category.instance == "Boolean") {
                                cont.append('<input type="checkbox"  ng-model="condition.value"/> True');
                                $compile(cont)(scope);
                                el.append(cont);
                                break;
                            }

                        case 'checkbox':
                            if (category.instance == "String") {
                                cont.append('<input type="checkbox"  ng-model="condition.value"/> True');
                                $compile(cont)(scope);
                                el.append(cont);
                                break;
                            }
                            if (category.instance == "Number") {
                                cont.append('<input type="checkbox"  class="form-control" ng-model="condition.value"/> True');
                                $compile(cont)(scope);
                                el.append(cont);
                                break;
                            }
                            if (category.instance == "Date") {
                                cont.append('<input type="checkbox" class="form-control" datepicker-popup ng-model="condition.value" is-open="opened" min-date="minDate"  datepicker-options="dateOptions" date-disabled="disabled(date, mode)"/> True');
                                $compile(cont)(scope);
                                el.append(cont);
                                break;
                            }
                            if (category.instance == "Boolean") {
                                cont.append('<input type="checkbox"  ng-model="condition.value"/> True');
                                $compile(cont)(scope);
                                el.append(cont);
                                break;
                            }
                    }

                }

            });
        }
    };
})
app.directive('numbersOnly', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function(inputValue) {
                if (inputValue == undefined) return ''
                var transformedInput = inputValue.replace(/[^0-9]/g, '');
                if (transformedInput != inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }

                return transformedInput;
            });
        }
    };
});