app.directive('customFields', function($compile) {
        return {
            
            link: function(scope, el, attrs) {
                 var cont = '<span></span>'
                cont = angular.element(cont);
                 scope.$watch('condition.operator', function(){
                    cont.empty();
                    el.empty();
                    if(scope.condition.operator!==''){
                        switch(scope.fields[scope.condition.operator].fieldType) {
                            case 'text':
                            cont.append('<input type="text" class="form-control" ng-model="condition.value"/>');
                            $compile(cont)(scope);
                            el.append(cont);
                            break;
                            case 'none':
                            cont.append('<input type="hidden"/>');
                            $compile(cont)(scope);
                            el.append(cont);                       
                            break;
                            case 'date':
                            cont.append('<input type="date" class="form-control" datepicker-popup ng-model="dt" is-open="opened" min-date="minDate"  datepicker-options="dateOptions" date-disabled="disabled(date, mode)"/>');
                            $compile(cont)(scope);
                            el.append(cont);                       
                            break;
                        }
                    }
                    
                });
                console.log('should i not have a div containing login controlled by loginController at this point?');
            }
        };
});