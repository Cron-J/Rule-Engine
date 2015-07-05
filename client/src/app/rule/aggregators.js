app.factory('aggregatorList', function() {
    /*
    * An aggregator base class 
    * eg: any, all, exactly1
    */
    var Aggregator = (function() {
        function Aggregator(id, label) {
            this.id = id;
            this.label = label;
        }
        //expression to evaluate if the collection aggregate meets the condition
        Aggregator.prototype.toJSExpression = function(collectionKey, conditionExpr) {
            return "Not Implemented";
        };
        return Aggregator;
    })();

    var AllAggregator = (function(_super) {
        __extends(AllAggregator, _super);

        function AllAggregator() {
            _super.call(this, "all", "All");
        }
        AllAggregator.prototype.toJSExpression = function(collectionKey, conditionExpr) {
            var jsExpr = "" +
                "(function(object) {" +
                    "var collection = {0};" +
                    "var object;" +
                    "for (var i = 0; i < collection.length; i++){" +
                        "object = collection[i];" +
                        "if (!{1}) {" +
                            "return false;" +
                    "}" +
                    "}" +
                    "return true;" +
                "})(object)";
            return jsExpr.format(collectionKey, conditionExpr);
        };
        return AllAggregator;
    })(Aggregator);

    var AnyAggregator = (function(_super) {
        __extends(AnyAggregator, _super);

        function AnyAggregator() {
            _super.call(this, "any", "Any");
        }
        AnyAggregator.prototype.toJSExpression = function(collectionKey, conditionExpr) {
            var jsExpr = "" +
                "(function(object){" +
                    "var collection =  {0};" +
                    "var object;" +
                    "for(var i = 0 ; i < collection.length; i++){" +
                        "object = collection[i];" +
                            "if(!{1})" +
                        "return true;" +
                    "}" +
                    "return false;" +
                "})(object)";
            return jsExpr.format(collectionKey, conditionExpr);
        };
        return AnyAggregator;
    })(Aggregator);

    //TOOD: change to exactly n
    var Exactly1Aggregator = (function(_super) {
        __extends(Exactly1Aggregator, _super);

        function Exactly1Aggregator() {
            _super.call(this, "exactly1", "Exactly1");
        }
        Exactly1Aggregator.prototype.toJSExpression = function(collectionKey, conditionExpr) {
            var jsExpr = "" +
                "(function(object){" +
                    "var n = 1" +
                    "var ctr = 0" +
                    "var collection = {0}; " +
                    "var object;" +
                    "for(var i = 0 ; i < collection.length; i++){" +
                        "object = collection[i];" +
                        "if(!{1})" +
                            "return false;" +
                    "}" +
                    "return ctr == n;" +
                "})(object)";
            return jsExpr.format(collectionKey, conditionExpr);
        };
        return Exactly1Aggregator;
    })(Aggregator);


    return {
        "all": new AllAggregator(),
        "any": new AnyAggregator(),
        "exactly1": new Exactly1Aggregator()
    }
});