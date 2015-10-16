/**
 * Created by Eswer on 10/15/2015.
 */
/****************** Start of Grammar Definitions in rule-engine *******************/
/*Grammar
 *<Rule> ::= <AnyAllCondition> {Action} <name>
 * <AnyAllCondition> ::= <on> | {Condition}
 * <Condition> ::= <AnyAllCondition> | <SimpleCondition>
 *  <SimpleCondition> ::= <lhsexpression> <Operator> <rhsexpression>
 *     <lhsexpression> ::= <Expression>
 *     <rhsexpression> ::= <Expression>
 *     <Operator> ::= <id><label><valueType><keyType>
 *     <Expression> ::= <variable> <isVariable>
 *         variable ::= <Variable> | <Constant>
 *         <Variable> ::= <key> <variable>
 *             <variable> ::= <Variable> | <AnyAllCondition>
 *         <Constant> ::= <type><value>
 */
// <constant> ::= <type><value>

export class Constant {
    constructor() {
        this.type = '';
        this.value = '';
        // to do test case
        this.type = 'String';
    }
}
// Variable holds a key and a type of its own for example key.key.key.key as product.attributesvalues.attribute.classificationid.
// <Variable> ::= <key> <variable>
// <variable> ::= <Variable> | <AnyAllCondition>
export class Variable {
    constructor(key,type = 'Variable') {
        this.key = key ? key : '';
        this.variable = {};
        this.type = type;
        // type true for variable and false for allanycondition
        this.isCollection = false;
    }
}
// Operator holds a operator type similar to > , < , = etc..
// <Operator> ::= <id><label><valueType><keyType>
export class Operator {
    constructor(id, label, valueType, keyTypes) {
        this.id = id;
        this.label = label;
        this.valueType = valueType;
        this.keyTypes = keyTypes;
    }
    // expression to operate on key and value, boolean result
    toJSExpression(key, value) {
        return 'Not Implemented' + value;
    }
    // is the operator is allowed for given keyType
    isAllowed(keyType) {
        return this.keyTypes.indexOf(keyType) > 0;
    }
}
// Expression have variable which holds a TYPE variable or a TYPE constant
// variable type is determined by isVariable
// <Expression> ::= <variable> <isVariable>
class Expression {
    constructor() {
        this.variable = {};
        this.isVariable = true;
    }
}
// SimpleCondition is an expressions resolve to true or false 1. (a = b)  2.(a > b)
// SimpleCondition holds leftexpression operator rightexpression
// <SimpleCondition> ::= <lhsexpression> <operator> <rhsexpression>
export class SimpleCondition {
    constructor() {
        this.lhsexpression = new Expression();
        this.rhsexpression = new Expression();
        this.operator = new Operator();
    }
}
// Condition specifies and, or on list of simpleconditions and also holds list of itselfs(for subconditions).
// Condition resolves to true or false;
// <Condition> ::= <AnyAllCondition> | <SimpleCondition>
export class Condition {
    constructor(type) {
        if(type) {
            var anyallcondition = new AnyAllCondition();
            anyallcondition.addCondition();
            this.AnyAllCondition = anyallcondition;
        }else {
            this.SimpleCondition = new SimpleCondition();
        }
    }
    toJSExpression() {

    }
    toSquel() {
        if(this.SimpleCondition){
            return this.SimpleCondition.toSquel();
        }
    }
    // addSimpleCondition = function addSimpleCondition() {
    //   this.simpleconditions.push(new SimpleCondition());
    // }
}
// AnyAllCondition holds list of conditions
//AnyallCondition = on ,
// <AnyAllCondition> ::= <on> | {Conditions}
export class AnyAllCondition {
    /** @namespace this.conditions */
    constructor() {
        this.on = ''; //applies on 'All' , 'Any' , 'AlleastOne'
        this.conditions = [];
        // default single condition init
        this.addCondition();
    }
    addCondition() {
        this.conditions.push(new Condition());
    }
    toJSExpression() {

    }
}
// Function class used to perform a function action based on type.
// to do.
class FunctionClass {
    constructor(name) {
        this.label = name;
    }
}
// Action class had the function and params to determine the type and action to be performed
// to do.
export class Action {
    constructor(name) {
        this.function = new FunctionClass(name);
        this.parameters = {};
    }
}
// Rule holds condition and a list of actions.
// <Rule> ::= <AnyAllCondition> {Action} <name>
export class Rule {
    constructor() {
        this.AnyAllCondition = new AnyAllCondition();
        this.actions = [];
        this.name = '';
        // todo for the test actions
        // this.addAction('send Email');
    }
    toJSExpression() {
        var jsExpr = "(function(item) {" +
            "var object = {\"{0}\": item};" +
            "return {1};" +
            "})";
        console.log(jsExpr.format(1,232));
        //return this.AnyAllCondition.toJSExpression();
    }
    addAction(param) {
        this.actions.push(new Action(param));
    }
}
/****************** End of Grammar Definitions in rule-engine *********************/