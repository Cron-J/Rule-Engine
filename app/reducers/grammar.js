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
/*
 * <Variable> ::= <type> {key} <variable>
  *     <variable> ::= <Variable> | <AnyAllCondition>
 * <type> ::= {collection}{string}{boolean}{date}
 *
 *
 */
export class Constant {
    constructor() {
        this.type = '';
        this.value = '';
        // to do test case
        this.type = 'String';
    }
    toJSExpression() {
        return this.value;
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
        this.toJSExpression = (object)=> {
            if(this.isCollection && this.variable && this.type ==='AnyAllCondition'){
                return this.variable.toJSExpression(object);
            }else if(this.type === 'Variable' && this.key){
                return '{0}.'.format(object) + this.key + this.variable.toJSExpression();
            }
            return '';
        }
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
        return this.id;
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
        this.variable = new Variable();
        this.isVariable = true;
    }
    toJSExpression(object) {
        return this.variable.toJSExpression(object);
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
    toJSExpression(object) {
        let operator;
        let jsExpr = this.lhsexpression.toJSExpression(object);
        if(this.operator.label && this.operator.id){
            switch(this.operator.id){
                case 'equalTo':operator = '===';break;
                case 'notEqualTo':operator = '!==';break;
                case 'greaterThan':operator = '>';break;
                case 'greaterThanEqual':operator = '>=';break;
                case 'lessThan':operator = '<';break;
                case 'lessThanEqual':operator = '<=';break;
                default: operator = '';break;
            }
           return  jsExpr + operator + this.rhsexpression.toJSExpression(object);
        }
        return jsExpr;
    }
}
// Condition specifies and, or on list of simpleconditions and also holds list of itselfs(for subconditions).
// Condition resolves to true or false;
// <Condition> ::= <AnyAllCondition> | <SimpleCondition>
export class Condition {
    constructor(type) {
        if(type) {
            this.AnyAllCondition = new AnyAllCondition();
        }else {
            this.SimpleCondition = new SimpleCondition();
        }
    }
    toJSExpression(object) {
        if(this.AnyAllCondition){
            return this.AnyAllCondition.toJSExpression(object);
        }else{
            return this.SimpleCondition.toJSExpression(object);
        }
    }
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
    toJSExpression(object) {
        let operation;
        switch(this.on){
            case 'Any' : operation = '||';break;
            case 'All' : operation = '&&';break;
            default : operation = '&&';break;
        }
        let jsExpr = this.conditions[0].toJSExpression(object);
        for(let i=1;i<this.conditions.length;i++){
            jsExpr += operation + this.conditions[i].toJSExpression(object);
        }
        return '('+jsExpr+')';
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
        // example schemaId = product
        this.schemaId = 'product';
        // todo for the test actions
        // this.addAction('send Email');
    }
    toJSExpression() {
        var jsExpr = "function(item) {" +
            "var {0}= item;"+
            "return {1};" +
            "}";
        console.log(jsExpr.format(this.schemaId,this.AnyAllCondition.toJSExpression(this.schemaId)));
        //return this.AnyAllCondition.toJSExpression();
    }
    addAction(param) {
        this.actions.push(new Action(param));
    }
}
/****************** End of Grammar Definitions in rule-engine *********************/