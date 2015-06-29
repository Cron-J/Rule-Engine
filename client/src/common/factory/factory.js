app.factory('StaticDataService', function() {
     
    var getAllStaticData = {}; 
 
            getAllStaticData.Operators = {
	            exists: {
	                label: "exists",
	                name: "exists",
	                rhInputType: "checkbox",
	                lhDataType: ["String", "Number", "Date", "Boolean"],
	                //JS:"",
	                toJSExpression: function(keystring, valuestring) {
	                    return ((valuestring ? '' : "!") + "(" + keystring + " === undefined || " + keystring + "=== null)");
	                }
	            },
	            empty: {
	                label: "empty",
	                name: "empty",
	                rhInputType: "checkbox",
	                lhDataType: ["String", "Number", "Date", "Boolean"],
	                //JS:"",
	                toJSExpression: function(keystring, valuestring) {
	                    return ((valuestring ? '' : "!") + "(" + keystring + "=== '' ||" + keystring + " === undefined || " + keystring + "=== null)");
	                }

	            },
	            equalTo: {
	                label: "equal to",
	                name: "equalTo",
	                rhInputType: "data",
	                lhDataType: ["String", "Number", "Date", "Boolean"],
	                //JS:"===",
	                toJSExpression: function(keystring, valuestring) {
	                    return keystring + "===\"" + valuestring + "\""
	                }
	            },
	            notEqualTo: {
	                label: "not equal to",
	                name: "notEqualTo",
	                rhInputType: "data",
	                lhDataType: ["String", "Number", "Date", "Boolean"],
	                //JS:"!==",
	                toJSExpression: function(keystring, valuestring) {
	                    return keystring + "!==\"" + valuestring + "\""
	                }
	            },
	            greaterThan: {
	                label: "greater than",
	                name: "greaterThan",
	                rhInputType: "number",
	                lhDataType: ["Number", "Date"],
	                //JS:">",
	                toJSExpression: function(keystring, valuestring) {
	                    return keystring + ">" + valuestring
	                }
	            },
	            greaterThanEqual: {
	                label: "greater than equal",
	                name: "greaterThanEqual",
	                rhInputType: "number",
	                lhDataType: ["Number", "Date"],
	                toJSExpression: function(keystring, valuestring) {
	                    return keystring + "=>" + valuestring
	                }
	            },
	            lessThan: {
	                label: "less than",
	                name: "lessThan",
	                rhInputType: "data",
	                lhDataType: ["Number", "Date"],
	                toJSExpression: function(keystring, valuestring) {
	                    return keystring + "<" + valuestring
	                }
	            },
	            lessThanEqual: {
	                label: "less than equal",
	                name: "lessThanEqual",
	                rhInputType: "data",
	                lhDataType: ["Number", "Date"],
	                toJSExpression: function(keystring, valuestring) {
	                    return keystring + "<=" + valuestring
	                }
	            },
	            endswith: {
	                label: "ends with",
	                name: "endswith",
	                rhInputType: "data",
	                lhDataType: ["String"],
	                toJSExpression: function(keystring, valuestring) {
	                    //keystring.indexOf(valuestring) + valuestring.length == keystring.length;
	                    return keystring + ".indexOf(\"" + valuestring + "\"" + ") + valuestring.length == keystring.length";
	                }
	            },
	            beginswith: {
	                label: "begins with",
	                name: "beginswith",
	                rhInputType: "data",
	                lhDataType: ["String"],
	                toJSExpression: function(keystring, valuestring) {
	                    //keystring.indexOf(valuestring) == 0;
	                    return keystring + ".indexOf(\"" + valuestring + "\"" + ") == 0";
	                }
	            },
	            contains: {
	                label: "contains",
	                name: "contains",
	                rhInputType: "data",
	                lhDataType: ["String"],
	                toJSExpression: function(keystring, valuestring) {
	                    //keystring.indexOf(valuestring) >= 0;
	                    return keystring + ".indexOf(\"" + valuestring + "\"" + ") >= 0";
	                }
	            }
        }
        getAllStaticData.Aggregators = {
        	all: {
                label: "all",
                name: "all",
                toJSExpression: function(collectionstring, conditionstring) {
                    return "(function(){" + 
                        "var object;" +
                        "for(var i = 0 ; i < " + collectionstring + ".length; i++){" +
                            "object = "+ collectionstring + "[i];" +
                            "if(!" + conditionstring + ")" +
                                "return false;" +
                        "}" +
                        "return true;" +
                    "})()";
                }
            },
            any: {
                label: "any",
                name: "any",
                toJSExpression: function(collectionstring, conditionstring) {
                     return "(function(){" + 
                        "var object;" +
                        "for(var i = 0 ; i < " + collectionstring + ".length; i++){" +
                            "object = "+ collectionstring + "[i];" +
                            "if(" + conditionstring + ")" +
                                "return true;" +
                        "}" +
                        "return false;" +
                    "})()";
                }
            },
            exactly1: {
                label: "exactly 1",
                name: "exactly1",
                toJSExpression: function(collectionstring, conditionstring) {
                   return "(function(){" + 
                        "var n = 1" +
                        "var ctr = 0" +
                        "var object;" +
                        "for(var i = 0 ; i < " + collectionstring + ".length; i++){" +
                            "object = "+ collectionstring + "[i];" +
                            "if(" + conditionstring + ")" +
                                "ctr++" +
                        "}" +
                        "return ctr == n;" +
                    "})()";
                }
            }

        }
 
    return getAllStaticData;
});