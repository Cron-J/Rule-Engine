var Action = (function() {
    function Action() {}
    Action.prototype.run = function(object) {
        //TODO: 
    };
    return Action;
})();

var operators = {}
var aggregators = {}
var Key = (function() {
    function Key() {
        this.field = undefined;
        this.aggregatorId = undefined;
    }
    return Key;
})();
var Condition = (function() {
    function Condition() {
        this.keys = [];
        this.keys.push(new Key());
        this.operatorId = undefined;
        this.value = undefined;
    }
    Condition.prototype.toJSExpression = function(index) {
        var jsExpr = "object",
            key;
        for (var i = index | 0; i < this.keys.length; i++) {
            key = this.keys[i];
            jsExpr+= ".";
            jsExpr += "{0}".format(key.field);
            if (key.aggregatorId) {
                return aggregators[key.aggregatorId].toJSExpression(jsExpr, this.toJSExpression(i + 1));
            }
        }
        return operators[this.operatorId].toJSExpression(jsExpr, this.value);
    };
    return Condition;
})();
var Subcondition = (function() {
    function Subcondition() {
        this.allany = "all";
        this.conditions = [];
        this.conditions.push(new Condition());
        this.subconditions = [];
    }
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
    Subcondition.prototype.toJSFunction = function() {
        var jsExpr = "" +
            "(function(object) {" +
            "return {0};" +
            "})";
        return jsExpr.format(this.toJSExpression());
    };
    return Subcondition;
})();
var Rule = (function() {
    function Rule(schemaId) {
        this.subconditions = [new Subcondition()];
        this.actions = [];
        //example - "product"
        this.schemaId = schemaId;
    }
    Rule.prototype.filter = function(collection) {
        var criteriaFn = this.condition.toJSFunction();
        var filteredCollection = [],
            object;
        for (var i = 0; i < collection.length; i++) {
            object[this.schemaId] = collection[i];
            if (criteriaFn(object))
                filteredCollection.push(collection[i]);
        }
        return filteredCollection;
    };
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
    Rule.prototype.filterFunction = function(){
       return this.subconditions[0].toJSFunction();
    }
    return Rule;
})();

