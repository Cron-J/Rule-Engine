var operators = {}, aggregators = {};//TODO: populate list of operators and aggregators

var Action = (function() {
    function Action() {}
    Action.prototype.run = function(object) {
        //TODO: 
    };
    return Action;
})();
/*
* A selected attribute from schema eg: manufacturerName
* Sequence of keys represents an operand eg: [product, manufacturerName] is product.manufactureName
*/
var Key = (function() {
    function Key() {
        this.field = undefined;
        //aggreatorId is defined only in case of subdocuments
        this.aggregatorId = undefined;
    }
    return Key;
})();
/*
* A condition  
* (Key[] - Operator - Value)
* eg: (product.ManufactureName - equals - "samsung")
*/
var Condition = (function() {
    function Condition() {
        this.keys = [];
        this.keys.push(new Key());
        this.operatorId = undefined;
        this.value = undefined;
    }
    //expression to evaluate if condition is true
    Condition.prototype.toJSExpression = function(index) {
        var jsExpr = "object",
            key;
        for (var i = index | 0; i < this.keys.length; i++) {
            key = this.keys[i];
            jsExpr += ".";
            jsExpr += "{0}".format(key.field);
            if (key.aggregatorId) {
                return aggregators[key.aggregatorId].toJSExpression(jsExpr, this.toJSExpression(i + 1));
            }
        }
        return operators[this.operatorId].toJSExpression(jsExpr, this.value);
    };
    return Condition;
})();
/*
* Set of conditions defined by:
*   (All, Any) - Infer logical operator  
*   Conditions[] - List of conditions
*   Subconditions[] - List of other subconditions
* TODO: Alternate name - ConditionSet
*/
var Subcondition = (function() {
    function Subcondition() {
        this.allany = "all";
        this.conditions = [];
        this.conditions.push(new Condition());
        this.subconditions = [];
    }
    //expression to evaluate if subcondition (condition set) is true
    Subcondition.prototype.toJSExpression = function() {
        var jsExpr = "";
        var andor = this.allany == "all" ? " && " : " || ";
        //conditions
        for (var i = 0; i < this.conditions.length; i++)
            jsExpr += this.conditions[i].toJSExpression(0) + andor;
        //subconditions
        for (var i = 0; i < this.subconditions.length; i++)
            jsExpr += this.subconditions[i].toJSExpression() + andor;
        //trim last andor
        jsExpr = jsExpr.length > 4 ? jsExpr.substr(0, jsExpr.length - 4) : jsExpr;
        return "({0})".format(jsExpr);
    };
    //function to evaluate if subcondition (condition set) is true 
    Subcondition.prototype.toJSFunction = function(schemaId) {
        var jsExpr = "" +
            "(function(item) {" +
                "var object = {\"{0}\": item};" + 
                "return {1};" +
            "})";
        return jsExpr.format(schemaId, this.toJSExpression());
    };
    return Subcondition;
})();
/*
* Rule to execute list of actions when a condition set is true
*/
var Rule = (function() {
    function Rule(schemaId) {
        this.subconditions = [new Subcondition()];
        this.actions = [];
        //example - "product"
        this.schemaId = schemaId;
    }
    //filters the collection based on condition
    Rule.prototype.filter = function(collection) {
        var criteriaFn = eval(this.subconditions[0].toJSFunction(this.schemaId));
        return collection.filter(criteriaFn);
    };
    //runs the actions for filtered collection based on condition
    Rule.prototype.run = function(collection) {
        var filteredCollection = this.filter(collection),
            action, object;
        for (var i = 0; i < filteredCollection.length; i++) {
            var object = filteredCollection[i];
            for (var i = 0; i < this.actions.length; i++) {
                action = this.actions[i];
                action.run(object);
            }
        }
    };
    ////function to filter collection based on conditions
    Rule.prototype.filterFunction = function() {
        return this.subconditions[0].toJSFunction(this.schemaId);
    }
    return Rule;
})();