/**
 * Created by Eswer on 10/15/2015.
 */
/****************** Start of Grammar Definitions in rule-engine *******************/
/*Grammar
 *<Rule> ::= <AnyAllCondition> {Action} <name> {type}
 * <AnyAllCondition> ::= <on> | {Condition} {type}
 * <Condition> ::= <AnyAllCondition> | <SimpleCondition> {type}
 *  <SimpleCondition> ::= <lhsexpression> <Operator> <rhsexpression> {type}
 *     <lhsexpression> ::= <Expression>
 *     <rhsexpression> ::= <Expression>
 *     <Operator> ::= <id><label><valueType><keyType> {type}
 *     <Expression> ::= <variable> <isVariable> {type}
 *         variable ::= <Variable> | <Constant> {type}
 *         <Variable> ::= <key> <variable> {type}
 *             <variable> ::= <Variable> | <AnyAllCondition>
 *         <Constant> ::= <key><value> {type}
 */
/****************** End of Grammar Definitions in rule-engine *******************/
/****************** Start of Class Definitions in rule-engine *******************/
export class BaseRule {
    // Acts as an abstract class for ducktyping
    constructor(){
        this.type = 'BaseRule';
    }
    toJSExpression() {

    }
}

import {AggregatorStore} from './SchemaStore.js';
var aggregatorslist = new AggregatorStore();

export class Constant extends BaseRule{
    constructor(object) {
        super();
        if(object && typeof object === 'object'){
            this.key = object.key;
            this.value = object.value;
        }
        else{
            this.key = object;
            this.value = '';
        }
        this.type = 'Constant';
    }
    toJSExpression() {
        return this.value;
    }
}
// Variable holds a key and a type of its own for example key.key.key.key as product.attributesvalues.attribute.classificationid.
// <Variable> ::= <key> <variable>
// <variable> ::= <Variable> | <AnyAllCondition>
export class Variable extends BaseRule{
    constructor(key,type = 'Variable') {
        super();
        if(key && typeof key === 'object'){
            this.key = key.key;
            this.variable = key.variable;
            this.variabletype = key.variabletype;
            this.isCollection = key.isCollection;
        }else{
            this.key = key ? key : '';
            this.variable = {};
            this.variabletype = type;
            this.isCollection = false;
        }
        this.type = 'Variable';
    }
    toJSExpression(object){
        //console.log(this.variable);
        if(this.isCollection && this.variable && this.variabletype ==='AnyAllCondition'){
            var aggregatortype  = this.key;
            let aggregatorfunc = (aggregatorslist[aggregatortype]).func;
            return aggregatorfunc.format(this.variable.toJSExpression('object'));
        }else if(this.isCollection && this.variable && this.variabletype==='Variable' && this.variable.toJSExpression){
            var obj = '{0}.{1} '.format(object,this.key);
            return '(function(object){ var collection = object;'+this.variable.toJSExpression(object)+')('+obj+')';
        }
        else if(!this.isCollection && this.variabletype === 'Variable' && this.key && this.variable.toJSExpression){
            return '{0}.'.format(object) + this.key + this.variable.toJSExpression();
        }
        return '';
    }
}
// Operator holds a operator type similar to > , < , = etc..
// <Operator> ::= <id><label><valueType><keyType>
export class Operator extends BaseRule{
    constructor(id, label, valueType, keyTypes) {
        super();
        if(id && typeof id === 'object'){
            this.id = id.id;
            this.label = id.label;
            this.valueType = id.valueType;
            this.keyTypes = id.keyTypes;
        }else{
            this.id = id;
            this.label = label;
            this.valueType = valueType;
            this.keyTypes = keyTypes;
        }
        this.type = 'Operator';
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
export class Expression extends BaseRule{
    constructor(object) {
        super();
        if(object && typeof object === 'object'){
            this.variable = object.variable;
            this.isVariable = object.isVariable;
        }else{
            this.variable = new Variable();
            this.isVariable = true;
        }
        this.type = 'Expression';
    }
    toJSExpression(object) {
        return this.variable.toJSExpression(object);
    }
}
// SimpleCondition is an expressions resolve to true or false 1. (a = b)  2.(a > b)
// SimpleCondition holds leftexpression operator rightexpression
// <SimpleCondition> ::= <lhsexpression> <operator> <rhsexpression>
export class SimpleCondition extends BaseRule{
    constructor(object) {
        super();
        if(object && typeof object === 'object'){
            this.lhsexpression = object.lhsexpression;
            this.rhsexpression = object.rhsexpression;
            this.operator = object.operator;
        }else{
            this.lhsexpression = new Expression();
            this.rhsexpression = new Expression();
            this.operator = new Operator();
        }
        this.type = 'SimpleCondition';
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
                case 'endsWith':operator = 'endsWith';break;
                default: operator = '';break;
            }
           return  jsExpr +' '+ operator +' '+ this.rhsexpression.toJSExpression(object);
        }
        return jsExpr;
    }
}
// Condition specifies and, or on list of simpleconditions and also holds list of itselfs(for subconditions).
// Condition resolves to true or false;
// <Condition> ::= <AnyAllCondition> | <SimpleCondition>
export class Condition extends BaseRule{
    constructor(type) {
        super();
        if(typeof type === 'object'){
           type.AnyAllCondition ? this.AnyAllCondition = type.AnyAllCondition: this.SimpleCondition = type.SimpleCondition;
        }else{
            if(type) {
                this.AnyAllCondition = new AnyAllCondition();
            }else {
                this.SimpleCondition = new SimpleCondition();
            }
        }
        this.type = 'Condition';
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
export class AnyAllCondition extends BaseRule{
    /** @namespace this.conditions */
    constructor(object) {
        super();
        if(object && typeof object === 'object'){
            this.on = object.on; //applies on 'All' , 'Any' , 'AlleastOne'
            this.conditions = object.conditions;
            this.type = 'AnyAllCondition';
        }else{
            this.on = ''; //applies on 'All' , 'Any' , 'AlleastOne'
            this.conditions = [];
            // default single condition init
            this.addCondition();
            this.type = 'AnyAllCondition';
        }
    }
    addCondition() {
        this.conditions.push(new Condition());
    }
    toJSExpression(object) {
        let operation;
        switch(this.on){
            case 'Any' : operation = ' || ';break;
            case 'All' : operation = ' && ';break;
            default : operation = ' && ';break;
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
class Function extends BaseRule{
    constructor(name) {
        super();
        this.label = name;
        this.type = 'Function';
    }
}
// Action class had the function and params to determine the type and action to be performed
// to do.
export class Action extends BaseRule{
    constructor(name) {
        super();
        // this.function = new FunctionClass(name);
        this.Function = null;
        this.parameters = {};
        this.type = 'Action';
    }
}
// Rule holds condition and a list of actions.
// <Rule> ::= <AnyAllCondition> {Action} <name>
export class Rule extends BaseRule{
    constructor(object) {
        super();
        this.condition = object ? object.AnyAllCondition ? object.AnyAllCondition : object.condition : new AnyAllCondition();
        this.actions = object ? object.actions : [];
        this.name = object ? object.name : '';
        this.type = 'Rule';
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
        console.log(jsExpr.format(this.schemaId,this.condition.toJSExpression(this.schemaId)));
        //return this.AnyAllCondition.toJSExpression();
    }
    addAction(param) {
        this.actions.push(new Action(param));
    }
}
/****************** End of Class Definitions in rule-engine *********************/
