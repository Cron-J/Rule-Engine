app.factory('operatorList', function() {
    var Operator = (function() {
        function Operator(id, label, valueType, keyTypes) {
            this.id = id;
            this.label = label;
            this.valueType = valueType;
            this.keyTypes = keyTypes;
        }
        Operator.prototype.toJSExpression = function(key, value) {
            return "Not Implemented"; //TODO: value.toDataString()
        };
        return Operator;
    })();
    var isEmptyOperator = (function(_super) {
        __extends(isEmptyOperator, _super);

        function isEmptyOperator() {
            _super.call(this, "isEmpty", "is empty", "checkbox", ["String", "Number", "Date", "Boolean"]);
        }
        isEmptyOperator.prototype.toJSExpression = function(key, value) {
            return "(({0}  === '')||({0} === undefined)||({0} === null)))".format(key, toDataString(value)); //TODO: value.toDataString();
        };
        return isEmptyOperator;
    })(Operator);
    var isExistsOperator = (function(_super) {
        __extends(isExistsOperator, _super);

        function isExistsOperator() {
            _super.call(this, "isExists", "is exists", "checkbox", ["String", "Number", "Date", "Boolean"]);
        }
        isExistsOperator.prototype.toJSExpression = function(key, value) {
            return "(({0}  === '')||({0} === undefined))".format(key, toDataString(value)); 
        };
        return isExistsOperator;
    })(Operator);
    var equalToOperator = (function(_super) {
        __extends(equalToOperator, _super);

        function equalToOperator() {
            _super.call(this, "equalTo", "equal to", "data", ["String", "Number", "Date", "Boolean"]);
        }
        equalToOperator.prototype.toJSExpression = function(key, value) {
            return "({0} == {1})".format(key, toDataString(value)); 
        };
        return equalToOperator;
    })(Operator);
    var notEqualToOperator = (function(_super) {
        __extends(notEqualToOperator, _super);

        function notEqualToOperator() {
            _super.call(this, "notEqualTo", "not equal to", "data", ["String", "Number", "Date", "Boolean"]);
        }
        notEqualToOperator.prototype.toJSExpression = function(key, value) {
            return "({0} !== {1})".format(key, toDataString(value)); 
        };
        return notEqualToOperator;
    })(Operator);
    var greaterThanOperator = (function(_super) {
        __extends(greaterThanOperator, _super);

        function greaterThanOperator() {
            _super.call(this, "greaterThan", "greater than", "data", ["Number", "Date"]);
        }
        greaterThanOperator.prototype.toJSExpression = function(key, value) {
            return "({0} > {1})".format(key, toDataString(value)); 
        };
        return greaterThanOperator;
    })(Operator);
    var greaterThanEqualOperator = (function(_super) {
        __extends(greaterThanEqualOperator, _super);

        function greaterThanEqualOperator() {
            _super.call(this, "greaterThanEqual", "greater than equal", "data", ["Number", "Date"]);
        }
        greaterThanEqualOperator.prototype.toJSExpression = function(key, value) {
            return "({0} >= {1})".format(key, toDataString(value)); 
        };
        return greaterThanEqualOperator;
    })(Operator);
    var lessThanOperator = (function(_super) {
        __extends(lessThanOperator, _super);

        function lessThanOperator() {
            _super.call(this, "lessThan", "less than", "data", ["Number", "Date"]);
        }
        lessThanOperator.prototype.toJSExpression = function(key, value) {
            return "({0} < {1})".format(key, toDataString(value)); 
        };
        return lessThanOperator;
    })(Operator);
    var lessThanEqualOperator = (function(_super) {
        __extends(lessThanEqualOperator, _super);

        function lessThanEqualOperator() {
            _super.call(this, "lessThanEqual", "less than equal", "data", ["Number", "Date"]);
        }
        lessThanEqualOperator.prototype.toJSExpression = function(key, value) {
            return "({0} <= {1})".format(key, toDataString(value)); 
        };
        return lessThanEqualOperator;
    })(Operator);
    var endsWithOperator = (function(_super) {
        __extends(endsWithOperator, _super);

        function endsWithOperator() {
            _super.call(this, "endsWith", "ends with", "data", ["String"]);
        }
        endsWithOperator.prototype.toJSExpression = function(key, value) {
            return "({0} (.indexOf({1})+{1}.length=={0}.length) {1})".format(key, toDataString(value)); 
        };
        return endsWithOperator;
    })(Operator);
    var beginsWithOperator = (function(_super) {
        __extends(beginsWithOperator, _super);

        function beginsWithOperator() {
            _super.call(this, "beginsWith", "begins with", "data", ["String"]);
        }
        beginsWithOperator.prototype.toJSExpression = function(key, value) {
            return "({0} (.indexOf({1})==0) {1})".format(key, toDataString(value)); 
        };
        return beginsWithOperator;
    })(Operator);
    var containsOperator = (function(_super) {
        __extends(containsOperator, _super);

        function containsOperator() {
            _super.call(this, "contains", "contains", "data", ["String"]);
        }
        containsOperator.prototype.toJSExpression = function(key, value) {
            return "({0} (.indexOf({1})>=0) {1})".format(key, toDataString(value)); 
        };
        return containsOperator;
    })(Operator);

    function toDataString(value){
        switch(typeof value){
            case "string":
                return '\"' + value + '\"';
                break;
            case "number":
                return value;
                break;
            case "object":
                if (value instanceof Date);
                    return  'new Date({0})'.format(value.toString());
                break;
            case "boolean":
                return ;
                break;

        }
    }

    
        return {
        "isEmpty": new isEmptyOperator(), 
        "isExists": new isExistsOperator(), 
        "equalTo": new equalToOperator(), 
        "notEqualTo": new notEqualToOperator(),
         "greaterThan":new greaterThanOperator(), 
         "greaterThanEqual":new  greaterThanEqualOperator(), 
         "lessThan":new lessThanOperator(), 
         "lessThanEqual":new lessThanEqualOperator(), 
         "endsWith":new endsWithOperator(), 
         "beginsWith":new beginsWithOperator(), 
         "contains":new containsOperator()
        };
    
})