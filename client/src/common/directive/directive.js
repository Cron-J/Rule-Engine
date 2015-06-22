app.directive('customFields', function($compile) {
        return {
            
            link: function(scope, el, attrs) {
                 var cont = '<span></span>'
                cont = angular.element(cont);
                 scope.$watch('condition.operator', function(){
                    cont.empty();
                    el.empty();
                    if(scope.condition.operator!==''){
                      //for(var i=0;i<scope.fields[scope.condition.operator].fieldType.length;i++){
                        switch(scope.fields[scope.condition.operator].fieldType[0]) {
                            case 'text':
                            cont.append('<input type="text" class="form-control" ng-model="condition.value"/>');
                            $compile(cont)(scope);
                            el.append(cont);
                            break;
                            case 'none':
                            cont.append('<input type="checkbox" ng-model="condition.value">');
                            $compile(cont)(scope);
                            el.append(cont);                       
                            break;
                            case 'date':
                            cont.append('<input type="date" class="form-control" datepicker-popup ng-model="dt" is-open="opened" min-date="minDate"  datepicker-options="dateOptions" date-disabled="disabled(date, mode)"/>');
                            $compile(cont)(scope);
                            el.append(cont);                       
                            break;
                            case 'number':
                            cont.append('<input type="text" class="form-control" numbers-only="numbers-only" ng-model="condition.value"/>');
                            $compile(cont)(scope);
                            el.append(cont);
                            break;

                        //}
                      }
                        
                    }
                    
                });
            }
        };
})
app.directive('numbersOnly', function(){
   return {
     require: 'ngModel',
     link: function(scope, element, attrs, modelCtrl) {
       modelCtrl.$parsers.push(function (inputValue) {
           if (inputValue == undefined) return '' 
           var transformedInput = inputValue.replace(/[^0-9]/g, ''); 
           if (transformedInput!=inputValue) {
              modelCtrl.$setViewValue(transformedInput);
              modelCtrl.$render();
           }         

           return transformedInput;         
       });
     }
   };
});
